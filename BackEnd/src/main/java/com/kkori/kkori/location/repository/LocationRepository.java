package com.kkori.kkori.location.repository;

import com.kkori.kkori.location.entity.LocationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<LocationInfo,Long> {

    Optional<LocationInfo> findByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude);

}
