package com.kkori.kkori.member.auth.service;

import com.kkori.kkori.member.auth.dto.res.OAuthInfoResponse;
import com.kkori.kkori.member.auth.params.OAuthLoginParams;
import com.kkori.kkori.member.auth.tokens.AuthTokens;
import com.kkori.kkori.member.auth.tokens.AuthTokensGenerator;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.member.entity.MemberInfo;
import com.kkori.kkori.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final OAuthInfoService oAuthInfoService;

    @Transactional
    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = oAuthInfoService.request(params);
        log.info(oAuthInfoResponse.toString());
        log.info(oAuthInfoResponse.getProfileImage());
        // member가 없으면 회원가입 진행
        Member member = findOrCreateMember(oAuthInfoResponse);
        if(member.getMemberInfo().getDeleted() == 1){ // 탈퇴한 회원이면
            reJoin(oAuthInfoResponse, member);
            member.getMemberInfo().updateDeleted(0);
        }
        log.info(member.toString());

        AuthTokens authTokens = authTokensGenerator.generate(member.getId());
        // RT 추가
        member.updateRefreshToken(authTokens.getRefreshToken());
        log.info(authTokens.getAccessToken());
        authTokens.setEmail(member.getEmail());
        authTokens.setNickName(member.getMemberInfo().getNickName());
        authTokens.setProfileImg(member.getMemberInfo().getProfileImg());
        return authTokens;
    }
    private void reJoin(OAuthInfoResponse oAuthInfoResponse, Member member){
        MemberInfo memberInfo = MemberInfo.builder()
                .nickName(oAuthInfoResponse.getNickName())
                .build();

        member.reJoinMember(memberInfo);
    }


    private Member newMember(OAuthInfoResponse oAuthInfoResponse) {

        MemberInfo memberInfo = MemberInfo.builder()
                .nickName(oAuthInfoResponse.getNickName())
                .build();


        String fullEmail = oAuthInfoResponse.getEmail();
        String email = fullEmail.substring(0, fullEmail.indexOf("@"));

        Member member = Member.builder()
                .name(oAuthInfoResponse.getName())
                .email(email)
                .birthday(oAuthInfoResponse.getBirthday())
                .gender(oAuthInfoResponse.getGender())
                .code(oAuthInfoResponse.getCode())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .memberInfo(memberInfo)
                .build();

        return memberRepository.save(member);
    }


    private Member findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {

        String fullEmail = oAuthInfoResponse.getEmail();
        String email = fullEmail.substring(0, fullEmail.indexOf("@"));

//        return memberRepository.findByEmail(oAuthInfoResponse.getEmail())
        return memberRepository.findByEmail(email)
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }



}
