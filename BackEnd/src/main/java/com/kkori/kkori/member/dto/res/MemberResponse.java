package com.kkori.kkori.member.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberResponse {
    private String nickName;
    private String introduce;
    private String profileImg;
    private String email;
    private Boolean isMyPage;

    @Builder
    public MemberResponse(String nickName, String introduce, String profileImg, String email, Boolean isMyPage) {
        this.nickName = nickName;
        this.introduce = introduce;
        this.profileImg = profileImg;
        this.email = email;
        this.isMyPage = isMyPage;
    }


}
