package com.kkori.kkori.member.auth.params;

import com.kkori.kkori.member.entity.OAuthProvider;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
public class NaverLoginParams implements OAuthLoginParams{
    private String authorizationCode; //로그인 인증 요청 API 호출에 성공하고 리턴받은 인증코드값 (authorization code)
    private String state; //사이트 간 요청 위조(cross-site request forgery) 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰값으로 URL 인코딩을 적용한 값을 사용

    @Override
    public OAuthProvider oAuthProvider() {

        return OAuthProvider.NAVER;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }
}
