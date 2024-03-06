package com.kkori.kkori.location.entity;

import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.location.userregion.entity.UserRegion;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class LocationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "location_info_id")
    private Long id;

    @Column(precision = 18, scale = 15)
    private BigDecimal latitude;

    @Column(precision = 18, scale = 15)
    private BigDecimal longitude;
    private String city;
    private String dong;

    @OneToMany(mappedBy = "locationInfo")
    @Builder.Default
    private Set<JobBoard> jobBoards = new HashSet<>();


    @OneToMany(mappedBy = "locationInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserRegion> userRegions = new HashSet<>();
}

