package com.kkori.kkori.walk.entity;

import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.member.entity.Member;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Walk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "walk_id")
    private Long walkId;

    @Column(name = "walk_start_time")
    private LocalDateTime walkStartTime;

    @Column(name = "walk_end_time")
    private LocalDateTime walkEndTime;

    @Column(name = "walk_path", nullable = false)
    private String walkPath;

    @Column(name = "walk_distance", nullable = false, length = 5)
    private String walkDistance;

    @Column(name = "calories", nullable = false, length = 5)
    private String calories;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;
}
