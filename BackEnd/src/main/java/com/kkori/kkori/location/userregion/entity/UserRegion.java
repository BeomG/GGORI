package com.kkori.kkori.location.userregion.entity;

import com.kkori.kkori.location.entity.LocationInfo;
import com.kkori.kkori.member.entity.Member;
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
public class UserRegion {

    @EmbeddedId
    private UserRegionId id;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @MapsId("regionId")
    @JoinColumn(name = "region_id")
    private LocationInfo locationInfo;

}
