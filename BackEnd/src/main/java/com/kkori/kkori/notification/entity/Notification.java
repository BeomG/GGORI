package com.kkori.kkori.notification.entity;

import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.validation_field.Content;
import lombok.*;


import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Embedded
    private Content content;
}
