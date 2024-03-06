package com.kkori.kkori.location.userregion.entity;

import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class UserRegionId implements Serializable {

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "region_id")
    private Long regionId;

}
