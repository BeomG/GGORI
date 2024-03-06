package com.kkori.kkori.jobboard.repository;

import com.kkori.kkori.jobboard.entity.JobBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobBoardRepository extends JpaRepository<JobBoard,Long> {
}
