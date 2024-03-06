package com.kkori.kkori.postlikes.service;

import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.jobboard.repository.JobBoardRepository;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.member.repository.MemberRepository;
import com.kkori.kkori.postlikes.dto.PostLikeRequest;
import com.kkori.kkori.postlikes.dto.PostLikeResponse;
import com.kkori.kkori.postlikes.entity.PostLikes;
import com.kkori.kkori.postlikes.repository.PostLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostLikeService {

    private final MemberRepository memberRepository;

    private final JobBoardRepository jobBoardRepository;

    private final PostLikeRepository postLikeRepository;

    public PostLikeResponse addLike(Long memberId,PostLikeRequest postLikeRequest) {
        Member member = getMember(memberId);
        JobBoard jobBoard = getJobBoard(postLikeRequest.getPostId());

        if (postLikeRepository.findByMemberAndJobBoard(member,jobBoard).isPresent()){
            throw new IllegalArgumentException("이미 좋아요 누름");
        }

        PostLikes like = PostLikes.builder()
                .jobBoard(jobBoard)
                .member(member)
                .build();

        postLikeRepository.save(like);

        return new PostLikeResponse(like);

    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(()
                        -> new IllegalArgumentException("존재하지 않는 멤버"));

    }

    private JobBoard getJobBoard(Long postId) {
        return jobBoardRepository.findById(postId)
                .orElseThrow(()
                        -> new IllegalArgumentException(" 존재하지 않는 게시물"));

    }
}
