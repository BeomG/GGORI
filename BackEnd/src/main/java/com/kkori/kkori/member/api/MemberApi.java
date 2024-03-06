package com.kkori.kkori.member.api;

import com.kkori.kkori.member.service.impl.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Api(tags = "Member")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberApi {


    private final MemberService memberService;

//    @Operation(summary = "mypage member 조회", description = "email로 mypage member 상세 조회")
//    @GetMapping("/{email}") // 시큐리티를 사용한다면 로그인이 됐으면 ? user 있을꺼고 나도 사용하고싶당~
//    public ResponseEntity<MemberResponse> findMemberById(@PathVariable("email") @ApiParam("유저 email") String email, @Parameter(hidden = true) @AuthenticationPrincipal User user){
//        Long loginId = Long.parseLong(user.getUsername()); //null exception -> 500 에러가 나감.
//        Long findId = memberQueryService.searchMemberIdByEmail(email);
//
//        MemberResponse memberResponse = memberService.findById(findId);
//        if(loginId == findId){
//            memberResponse.setIsMyPage(true);
//        }else{
//            memberResponse.setIsMyPage(false);
//        }
//        return ResponseEntity.ok(memberResponse);
//    }




//    @Operation(summary = "member 정보 수정", description = "회원 정보(닉네임, 자기소개)를 수정한다.")
//    @PutMapping("/update")
//    public ApiResponse<String> update(@RequestBody @ApiParam("수정할 회원 정보") MemberUpdateRequest memberUpdateRequest, @Parameter(hidden = true) @AuthenticationPrincipal User user){
//        Long loginId = Long.parseLong(user.getUsername());
//
//        MemberUpdateDto dto = MemberUpdateDto.builder()
//                .loginId(loginId)
//                .nickName(memberUpdateRequest.getNickName())
//                .introduce(memberUpdateRequest.getIntroduce())
//                .build();
//        String updateMemberEmail = memberService.updateMember(dto);
//        return ApiResponse.OK(updateMemberEmail);
//    }

//    @Operation(summary = "member profile image 수정", description = "회원 프로필 이미지를 수정한다.")
//    @PutMapping("/image/update")
//    public ApiResponse<String> updateProfileImg(@RequestPart MultipartFile profileImg, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
//        fileExtFilter.imageFilter(profileImg); // 이미지 확장자 검사
//        Long loginId = Long.parseLong(user.getUsername());
//        String updateMemberEmail = memberService.updateProfileImg(profileImg, loginId);
//        return ApiResponse.OK(updateMemberEmail);
//    }
//    @Operation(summary = "member profile image 수정", description = "회원 프로필 이미지를 삭제한다.")
//    @DeleteMapping("/image/delete")
//    public ApiResponse<String> removeProfileImg(@Parameter(hidden = true) @AuthenticationPrincipal User user) {
//        Long loginId = Long.parseLong(user.getUsername());
//        String MemberEmail =memberService.removeProfileImg(loginId);
//        return ApiResponse.OK(MemberEmail);
//    }
//
//    @Operation(summary = "로그아웃", description = "로그아웃")
//    @GetMapping("/logout")
//    public ApiResponse<Void> logout(HttpServletRequest httpServletRequest, @Parameter(hidden = true) @AuthenticationPrincipal User user){
//        HttpSession session = httpServletRequest.getSession();
//        session.invalidate();
//        Long loginId = Long.parseLong(user.getUsername());
//        memberService.deleteRefreshToken(loginId);
//        return ApiResponse.OK(null);
//    }

//    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴")
//    @DeleteMapping()
//    public ApiResponse<Void> delete(@Parameter(hidden = true) @AuthenticationPrincipal User user){
//        Long loginId = Long.parseLong(user.getUsername());
//        memberService.delete(loginId);
//        return ApiResponse.OK(null);
//    }

}
