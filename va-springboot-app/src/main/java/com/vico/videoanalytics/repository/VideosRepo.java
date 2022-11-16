package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideosRepo extends JpaRepository<Videos, Long> {
    Videos findByIdIs(Long Id);


}
