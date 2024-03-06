package com.kkori.kkori.postlikes.repository;

import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.postlikes.entity.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLikes,Long> {
    Optional<JobBoard> findByMemberAndJobBoard (Member member, JobBoard jobBoard);

}
