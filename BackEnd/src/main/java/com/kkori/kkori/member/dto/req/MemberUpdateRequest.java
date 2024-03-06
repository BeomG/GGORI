package com.kkori.kkori.member.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MemberUpdateRequest {
    private String nickName;
    private String introduce;


}
