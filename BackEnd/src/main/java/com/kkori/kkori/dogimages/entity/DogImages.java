package com.kkori.kkori.dogimages.entity;

import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.device.entity.Device;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
public class DogImages extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dogImageId;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

}
