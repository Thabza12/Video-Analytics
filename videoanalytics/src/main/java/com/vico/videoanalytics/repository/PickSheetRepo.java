package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickSheetRepo extends JpaRepository<PickSheet, Long> {
    PickSheet findByVideos(Videos videos);


}
