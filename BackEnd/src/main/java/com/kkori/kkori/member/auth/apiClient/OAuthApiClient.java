package com.kkori.kkori.member.auth.apiClient;

import com.kkori.kkori.member.auth.dto.res.OAuthInfoResponse;
import com.kkori.kkori.member.auth.params.OAuthLoginParams;
import com.kkori.kkori.member.entity.OAuthProvider;


public interface OAuthApiClient {
    // client 타입 변환
    OAuthProvider oAuthProvider();

    //Authorization Code를 기반으로 AT획득
    String requestAccessToken(OAuthLoginParams params);

    //AT기반으로 사용자 조회
    OAuthInfoResponse requestOAuthInfo(String accessToken);
}
