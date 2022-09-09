package com.vico.videoanalytics.service;

import com.vico.videoanalytics.domain.AlgoResults;
import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.PickSheetDetails;
import com.vico.videoanalytics.domain.Videos;
import com.vico.videoanalytics.repository.AlgoResultsRepo;
import com.vico.videoanalytics.repository.VideosRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AlgoResultsService {

    @Autowired
    private AlgoResultsRepo repo;

    @Autowired
    private VideosRepo videosRepo;
    public Iterable<AlgoResults> getAllAlgoResults() {
        return repo.findAll();
    }

    public Optional findById(Long id) {
        return repo.findById(id);
    }

    public AlgoResults updateAlgoResults(AlgoResults algoResults) {
        return repo.save(algoResults);
    }

    public void deleteAlgoResults(Long id) {
        AlgoResults algoResults = repo.findById(id).get();
        algoResults.setDeleted(true);

        Videos video = videosRepo.getReferenceById(id);
        video.setDeleted(true);

        repo.save(algoResults);
    }
}
