package com.kkori.kkori.device.controller;

import com.kkori.kkori.device.dto.DeviceResponse;
import com.kkori.kkori.device.dto.RegisterDogRequest;
import com.kkori.kkori.device.dto.RegisterDogResponse;
import com.kkori.kkori.device.service.DeviceService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/device")
@RequiredArgsConstructor
@Api
public class DeviceController {

    private final DeviceService deviceService;

    @PostMapping("/register-dog")
    public ResponseEntity<RegisterDogResponse> registerDog(
            final Authentication authentication,
            @RequestBody RegisterDogRequest request
            ){

        long memberId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(deviceService.registerDog(memberId,request));
    }
}
