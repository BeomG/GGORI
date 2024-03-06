package com.kkori.kkori.dogimages.repository;

import com.kkori.kkori.dogimages.entity.DogImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogImagesRepository extends JpaRepository <DogImages,Long> {
}
