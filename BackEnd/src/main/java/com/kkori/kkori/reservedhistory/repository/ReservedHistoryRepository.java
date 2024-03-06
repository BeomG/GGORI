package com.kkori.kkori.reservedhistory.repository;

import com.kkori.kkori.reservedhistory.entity.ReservedHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservedHistoryRepository extends JpaRepository<ReservedHistory,Long> {
}
