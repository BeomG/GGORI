package com.kkori.kkori.member.entity;

import com.kkori.kkori.member.service.dto.MemberUpdateDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
public class MemberInfo {
    @Column(name = "nick_name", nullable = false, length = 16)
    private String nickName; //닉네임
    @Column(length = 150)
    private String introduce;//자기소개
    @Column(name = "profile_img") // 스토리지에 저장된 이미지 파일 이름
    private String profileImg;//프로필 이미지
    private int reported;//재제 수
    private int deleted;//탈퇴 여부
    private int banned;//신고 여부

    public void updateMemberInfo(MemberUpdateDto memberUpdateDto){
        this.nickName = memberUpdateDto.getNickName();
        this.introduce = memberUpdateDto.getIntroduce();
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
    public void updateReported(int reported){
        this.reported = reported;
    }
    public void updateDeleted(int deleted){
        this.deleted = deleted;
    }
    public void updateBanned(int banned){
        this.banned = banned;
    }
}
