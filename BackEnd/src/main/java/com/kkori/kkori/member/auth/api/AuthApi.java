package com.kkori.kkori.member.auth.api;

import com.kkori.kkori.member.auth.params.NaverLoginParams;
import com.kkori.kkori.member.auth.service.OAuthLoginService;
import com.kkori.kkori.member.auth.tokens.AuthTokens;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(tags = "Auth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthApi {
    private final OAuthLoginService oAuthLoginService;
    @Operation(summary = "네이버 로그인",description = "params로 인가코드를 주면 AccessToken 및 RefeshToken 반환")
    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverLoginParams params){
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }
}
