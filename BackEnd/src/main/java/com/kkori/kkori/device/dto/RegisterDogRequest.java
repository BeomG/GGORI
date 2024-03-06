package com.kkori.kkori.device.dto;

import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.device.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDogRequest {

    private String dogName;

    private LocalDate dogBirthDay;

    private Gender gender;

    private String dogBreed;

    private BigDecimal dogWeight;

    private Boolean dogNeuter;

    private Boolean isLostDog;

    private Boolean isRegistered;

    private String dogImages;

    public Device toDevice(){
        return Device.builder()
                .dogName(this.dogName)
                .dogBirthDay(this.dogBirthDay)
                .gender(this.gender)
                .dogBreed(this.dogBreed)
                .dogWeight(this.dogWeight)
                .dogNeuter(this.dogNeuter)
                .isLostDog(this.isLostDog)
                .isRegistered(this.isRegistered)
                .dogImages(dogImages)
                .build();


    }
}
