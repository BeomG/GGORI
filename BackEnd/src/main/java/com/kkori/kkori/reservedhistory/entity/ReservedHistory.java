package com.kkori.kkori.reservedhistory.entity;

import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.member.entity.Member;
import lombok.*;
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
public class ReservedHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservedHistoryId;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "sitter_id", referencedColumnName = "member_id")
    private Member sitter;
    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "post_id")
    private JobBoard jobBoard;

    private Boolean isReserved;

}
