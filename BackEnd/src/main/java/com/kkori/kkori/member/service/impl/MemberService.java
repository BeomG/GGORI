package com.kkori.kkori.member.service.impl;

import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.member.repository.MemberRepository;
import com.kkori.kkori.member.service.dto.MemberUpdateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
//    private FileManger fileManger = new FileManger();
////    private final String imgPath = "https://storage.googleapis.com/reon-bucket/";
//    private final Storage storage;

    private final MemberRepository memberRepository;

    public String updateMember(MemberUpdateDto memberUpdateDto) {
        Member findMember = memberRepository.findById(memberUpdateDto.getLoginId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않은 사용자"));
        findMember.getMemberInfo().updateMemberInfo(memberUpdateDto);
        return findMember.getEmail();
    }
    public void deleteRefreshToken(Long id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("찾을 수 없음"));
        findMember.deleteRefreshToken();
    }
    //    @Override
//    public String updateProfileImg(MultipartFile profileImg, Long loginId) {
//        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
//        if(findMember.getMemberInfo().getProfileImg() != null){
//            fileManger.removeImgFile(findMember.getMemberInfo().getProfileImg(), storage);
//        }
//        String imgName = fileManger.updateImgFile(profileImg, storage);
//        findMember.getMemberInfo().updateProfileImg(imgName);
//        return findMember.getEmail();
//    }
//    @Override
//    public String removeProfileImg(Long loginId) {
//        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
//        if(findMember.getMemberInfo().getProfileImg() != null){
//            fileManger.removeImgFile(findMember.getMemberInfo().getProfileImg(), storage);
////            removeImgFile(findMember.getMemberInfo().getProfileImg());
//        }
//        findMember.getMemberInfo().updateProfileImg(null);
//        return findMember.getEmail();
//    }
    public String delete(Long loginId) {
        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new IllegalArgumentException("멤버를 찾을 수 없음"));
        findMember.getMemberInfo().updateDeleted(1);

        return findMember.getEmail();
    }




}
