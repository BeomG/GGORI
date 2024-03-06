package com.kkori.kkori.member.auth.apiClient;

import com.kkori.kkori.member.auth.dto.res.NaverInfoResponse;
import com.kkori.kkori.member.auth.dto.res.OAuthInfoResponse;
import com.kkori.kkori.member.auth.params.NaverTokens;
import com.kkori.kkori.member.auth.params.OAuthLoginParams;
import com.kkori.kkori.member.entity.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Component
@RequiredArgsConstructor
public class NaverApiClient implements OAuthApiClient{

    private static final String GRANT_TYPE = "authorization_code";
    private final RestTemplate restTemplate;

    @Value("${oauth.naver.url.auth}")
    private String authUrl;

    @Value("${oauth.naver.url.api}")
    private String apiUrl;

    @Value("${oauth.naver.client-id}")
    private String clientId;

    @Value("${oauth.naver.secret}")
    private String clientSecret;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.NAVER;
    }

    @Override
    public String requestAccessToken(OAuthLoginParams params) {
        String url = authUrl + "/oauth2.0/token";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = params.makeBody();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        System.out.println("code : " + body.get("code"));
        System.out.println("state : " + body.get("state"));



        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);
        NaverTokens response = restTemplate.postForObject(url, request, NaverTokens.class);
        System.out.println("accessToken : " + response.getAccessToken());

        assert response != null;
        return response.getAccessToken();
    }

    @Override
    public OAuthInfoResponse requestOAuthInfo(String accessToken) {

        String url = apiUrl + "/v1/nid/me";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        return restTemplate.postForObject(url, request, NaverInfoResponse.class);
    }
}
