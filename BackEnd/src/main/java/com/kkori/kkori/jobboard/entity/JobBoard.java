package com.kkori.kkori.jobboard.entity;

import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.location.entity.LocationInfo;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.validation_field.Content;
import com.kkori.kkori.validation_field.Title;
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
public class JobBoard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Embedded
    private Title title;

    @Embedded
    private Content content;

    private Integer payment;

    @ManyToOne
    @JoinColumn(name = "location_info_id")
    private LocationInfo locationInfo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    public void assignMember(Member member) {
        if (this.member != null) {
            throw new IllegalStateException("이미 이 글이 할당된 멤버가 있음");
        }
        this.member = member;
    }

    public void assignLocation(LocationInfo locationInfo) {
        this.locationInfo = locationInfo;
        locationInfo.getJobBoards().add(this);
    }

    public String getTitleValue() {
        if (this.title != null) {
            return title.getTitle();
        }
        return null;
    }

    public String getContentValue() {
        if (this.content != null) {
            return content.getContent();
        }
        return null;
    }


}
