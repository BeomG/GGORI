package com.kkori.kkori.location.dto;


import com.kkori.kkori.location.entity.LocationInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationResponse {

    private BigDecimal latitude;
    private BigDecimal longitude;
    private String city;
    private String dong;

    public LocationResponse (LocationInfo locationInfo){
        this.latitude = locationInfo.getLatitude();
        this.longitude = locationInfo.getLongitude();
        this.city = locationInfo.getCity();
        this.dong = locationInfo.getDong();
    }


}
