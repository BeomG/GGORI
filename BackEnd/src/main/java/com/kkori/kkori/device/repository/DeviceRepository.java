package com.kkori.kkori.device.repository;

import com.kkori.kkori.device.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device,Long> {
}
