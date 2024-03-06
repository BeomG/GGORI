package com.kkori.kkori.member.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MemberUpdateDto {
    private Long loginId;
    private String nickName;
    private String introduce;

    @Builder
    public MemberUpdateDto(Long loginId, String nickName, String introduce) {
        this.loginId = loginId;
        this.nickName = nickName;
        this.introduce = introduce;
    }
}
