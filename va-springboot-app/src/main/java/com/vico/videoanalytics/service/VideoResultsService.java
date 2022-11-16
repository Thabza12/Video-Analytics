package com.vico.videoanalytics.service;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.PickSheetDetails;
import com.vico.videoanalytics.domain.VideoResults;
import com.vico.videoanalytics.domain.Videos;
import com.vico.videoanalytics.repository.VideoResultsRepo;
import com.vico.videoanalytics.repository.VideosRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VideoResultsService {

    @Autowired
    private VideoResultsRepo repo;

    @Autowired
    private VideosRepo videosRepo;
    public Iterable<VideoResults> getAllVideoResults() {
        return repo.findAll();
    }

    public Optional findById(Long id) {
        return repo.findById(id);
    }

    public VideoResults updateVideoResults(VideoResults videoResults) {
        return repo.save(videoResults);
    }

    public void deleteVideoResults(Long id) {

        VideoResults videoResults = repo.findById(id).get();
        videoResults.setDeleted(true);

        Videos video = videosRepo.getReferenceById(id);
        video.setDeleted(true);

        repo.save(videoResults);

    }
}
