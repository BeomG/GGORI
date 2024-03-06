package com.kkori.kkori.device.entity;


public enum Gender {
    MALE("남", "Male"),
    FEMALE("여", "Female");

    private final String krGender;
    private final String enGender;

    Gender(String krGender, String enGender) {
        this.krGender = krGender;
        this.enGender = enGender;
    }

    public String getKrName() {
        return krGender;
    }

    public String getEnGender() {
        return enGender;
    }
}
