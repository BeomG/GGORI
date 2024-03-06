package com.kkori.kkori.device.entity;

import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.dogimages.entity.DogImages;
import com.kkori.kkori.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Device extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deviceId;

    private String deviceNumber;

    private String qrCode;

    private String dogName;

    private LocalDate dogBirthDay;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String dogBreed;

    private BigDecimal dogWeight;

    private Boolean dogNeuter;

    private Boolean isLostDog;

    private Boolean isRegistered;

    private String dogImages;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void setMember (Member member){
        this.member = member;
    }

}
