package com.kkori.kkori.location.api;


import com.kkori.kkori.location.dto.LocationRequest;
import com.kkori.kkori.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class LocationController {

    private final LocationService locationService;

}
