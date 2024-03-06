package com.kkori.kkori.device.dto;


import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.device.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RegisterDogResponse {

    private String dogName;

    private LocalDate dogBirthDay;

    private String gender;

    private String dogBreed;

    private BigDecimal dogWeight;

    private Boolean dogNeuter;

    private Boolean isLostDog;

    private Boolean isRegistered;

    private String dogImages;

    public RegisterDogResponse (Device device){
        this.dogName = device.getDogName();
        this.dogBreed = device.getDogBreed();
        this.gender = device.getGender().getEnGender();
        this.dogImages = device.getDogImages();
        this.dogNeuter = device.getDogNeuter();
        this.dogWeight = device.getDogWeight();
        this.isRegistered = device.getIsRegistered();
        this.isLostDog = device.getIsLostDog();

    }
}
