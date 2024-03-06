package com.kkori.kkori.review.repository;

import com.kkori.kkori.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
