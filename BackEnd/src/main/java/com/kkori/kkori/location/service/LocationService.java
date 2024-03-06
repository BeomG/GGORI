package com.kkori.kkori.location.service;

import com.kkori.kkori.location.dto.LocationRequest;
import com.kkori.kkori.location.entity.LocationInfo;
import com.kkori.kkori.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;


    public LocationRequest callXY(String address){
        String apikey = "2E7D778C-C966-39D3-9CC9-20E922BD6543";
        String searchType = "parcel";
        String searchAddr = address;
        String epsg = "epsg:4326";

        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getCoord");
        sb.append("&format=json");
        sb.append("&crs=" + epsg);
        sb.append("&key=" + apikey);
        sb.append("&type=" + searchType);
        sb.append("&address=" + URLEncoder.encode(searchAddr, StandardCharsets.UTF_8));

        try{
            URL url = new URL(sb.toString());
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));

            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(reader);
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONObject jsResult = (JSONObject) jsrs.get("result");
            JSONObject jspoitn = (JSONObject) jsResult.get("point");

            LocationRequest locationRequest = new LocationRequest();
            locationRequest.setLatitude(Double.valueOf((String) jspoitn.get("x")));
            locationRequest.setLongitude(Double.valueOf((String) jspoitn.get("y")));

            return locationRequest;

        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }


    @Transactional
    public LocationInfo callApi(LocationRequest locationRequest) {

        String apikey = "2E7D778C-C966-39D3-9CC9-20E922BD6543";
        String searchType = "both";
        String searchPoint = Double.toString(locationRequest.getLatitude()) + "," + Double.toString(locationRequest.getLongitude());
        String epsg = "epsg:4326";

        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getAddress");
        sb.append("&version=2.0");
        sb.append("&crs=").append(epsg);
        sb.append("&point=").append(searchPoint);
        sb.append("&format=json");
        sb.append("&type=").append(searchType);
        sb.append("&zipcode=true");
        sb.append("&simple=false");
        sb.append("&key=").append(apikey);

        log.info(" 사이트 {}", sb.toString());

        try {
            var jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(sb.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = jsrs != null ? (JSONArray) jsrs.get("result") : null;

            log.info(" 주소 {}", jsob);

            if (jsonArray != null && !jsonArray.isEmpty()) {
                JSONObject jsonfor = (JSONObject) jsonArray.get(0);
                String fullAddress = (String) jsonfor.get("text");

                String[] addressParts = fullAddress.split(" ");


                for (String addressPart : addressParts) {
                    log.info(" 주소만 추출 {}", addressPart);

                }


                String city = addressParts[0];
//                String dong = addressParts[addressParts.length - 1].replace("(", "").replace(")", "");
                String dong = addressParts[2];


                LocationInfo existingLocationInfo = locationRepository.findByLatitudeAndLongitude(
                        BigDecimal.valueOf(locationRequest.getLatitude()),
                        BigDecimal.valueOf(locationRequest.getLongitude())
                ).orElse(null);

                if (existingLocationInfo != null) {
                    return existingLocationInfo;
                }

                LocationInfo locationInfo = LocationInfo.builder()
                        .latitude(BigDecimal.valueOf(locationRequest.getLatitude()))
                        .longitude(BigDecimal.valueOf(locationRequest.getLongitude()))
                        .city(city)
                        .dong(dong)
                        .build();

                existingLocationInfo = locationRepository.findByLatitudeAndLongitude(
                        locationInfo.getLatitude(),
                        locationInfo.getLongitude()
                ).orElse(null);

                if (existingLocationInfo != null) {
                    return existingLocationInfo;
                }

                return locationRepository.save(locationInfo);
            } else {
                throw new IllegalStateException("Address not found");
            }
        } catch (IOException | net.minidev.json.parser.ParseException e) {
            throw new IllegalStateException("Internal Server Error", e);
        }
    }
}
