package com.kkori.kkori.member.auth.dto.res;

import com.kkori.kkori.member.entity.OAuthProvider;

public interface OAuthInfoResponse {
    // 이름, 이메일, 생년월일, 성별, 닉네임, 프로필 사진
    // 로그인 도메인 추가 시 수정 필요
    String getName();
    String getEmail();
    String getNickName();
    String getGender();
    String getCode();
    String getBirthday();
    String getProfileImage();
    OAuthProvider getOAuthProvider();
}
