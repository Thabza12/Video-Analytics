package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickSheetRepo extends JpaRepository<PickSheet, Long> {
    PickSheet findByVideos(Videos id);

    PickSheet findByPickSheetIDIs(Long pickSheetId);

    @Query("FROM PickSheet WHERE videos is null")
    List<PickSheet> getPickSheetsByVideos();


}
