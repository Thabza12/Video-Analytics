package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.VideoResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoResultsRepo extends JpaRepository<VideoResults, Long> {


}
