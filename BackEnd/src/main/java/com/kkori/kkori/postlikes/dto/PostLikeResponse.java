package com.kkori.kkori.postlikes.dto;


import com.kkori.kkori.postlikes.entity.PostLikes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PostLikeResponse {

    private Long postId;

    private Long memberId;

    public PostLikeResponse(PostLikes postLikes) {
        this.postId = postLikes.getJobBoard().getPostId();
        this.memberId = postLikes.getMember().getId();
    }

}
