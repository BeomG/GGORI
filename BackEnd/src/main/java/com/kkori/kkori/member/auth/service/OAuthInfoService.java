package com.kkori.kkori.member.auth.service;

import com.kkori.kkori.member.auth.apiClient.OAuthApiClient;
import com.kkori.kkori.member.auth.dto.res.OAuthInfoResponse;
import com.kkori.kkori.member.auth.params.OAuthLoginParams;
import com.kkori.kkori.member.entity.OAuthProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Slf4j
public class OAuthInfoService {
    private final Map<OAuthProvider, OAuthApiClient> clients;

    public OAuthInfoService(List<OAuthApiClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.collectingAndThen(
                        Collectors.toMap(OAuthApiClient::oAuthProvider, Function.identity()),
                        Collections::unmodifiableMap
                )
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params) {
        OAuthApiClient client = clients.get(params.oAuthProvider());
        log.info(client.toString());
        String accessToken = client.requestAccessToken(params);
        return client.requestOAuthInfo(accessToken);
    }
}
