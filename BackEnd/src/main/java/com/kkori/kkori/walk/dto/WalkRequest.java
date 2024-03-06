package com.kkori.kkori.walk.dto;


import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class WalkRequest {


    private LocalDateTime walkStartTime;

    private LocalDateTime walkEndTime;

    private String walkPath;

    private String walkDistance;

    private String calories;

    private Member member;

    private Device device;

    //                .transactionDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime())
}
