package com.kkori.kkori.review.entity;

import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.reservedhistory.entity.ReservedHistory;
import com.kkori.kkori.validation_field.Content;
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
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private Content content;

    @ManyToOne(fetch = FetchType.LAZY)
    private ReservedHistory reservedHistory;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    //내일 이야기 해볼 것


}
