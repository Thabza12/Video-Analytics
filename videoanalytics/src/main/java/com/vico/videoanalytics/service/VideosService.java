package com.vico.videoanalytics.service;

import com.vico.videoanalytics.domain.*;
import com.vico.videoanalytics.repository.AlgoResultsRepo;
import com.vico.videoanalytics.repository.PickSheetRepo;
import com.vico.videoanalytics.repository.VideoResultsRepo;
import com.vico.videoanalytics.repository.VideosRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideosService {

    @Autowired
    private VideosRepo repo;

    @Autowired
    private PickSheetRepo pickSheetRepo;

    @Autowired
    private VideoResultsRepo videoResultsRepo;

    @Autowired
    private PickSheetService pickSheetService;

    @Autowired
    private AlgoResultsRepo algoResultsRepo;

    public Iterable<Videos> getAllVideos() {
        return repo.findAll();
    }

    public Optional<Videos> findById(Long id) {
        return repo.findById(id);
    }

    public Videos updateVideo(Videos video) {
        return repo.save(video);
    }

    public void deleteVideo(Long id) {
        Videos video = repo.findById(id).get();
        video.setDeleted(true);

        for(AlgoResults algoResults : video.getAlgoResults()) {
            algoResults.setDeleted(true);
        }

        PickSheet pickSheet = pickSheetRepo.getReferenceById(id);
        pickSheet.setDeleted(true);

        for(VideoResults videoResults : video.getVideoResults()){
            videoResults.setDeleted(true);
        }

        repo.save(video);
    }

    public Videos uploadVideos(VideosRequest videosRequest){

        Videos video = new Videos();
        video.setVideoFile(videosRequest.getVideoFile());
        video.setRecordDate(videosRequest.getRecordDate());
        video.setStartTime(videosRequest.getStartTime());
        video.setEndTime(videosRequest.getEndTime());
        repo.save(video);

        List<VideoResults> videoResultsList = new ArrayList<VideoResults>();
        if (videosRequest.getVideoResultsRequest() != null){
            for (VideoResultsRequest videoResultsRequest : videosRequest.getVideoResultsRequest()){
                VideoResults videoResults = new VideoResults();
                videoResults.setPickedProduct(videoResultsRequest.getPickedProduct());
                videoResults.setTotalCases(videoResultsRequest.getTotalCases());
                videoResults.setVideos(video);
                videoResultsList.add(videoResults);
            }

            videoResultsRepo.saveAll(videoResultsList);
        }

        List<AlgoResults> algoResultsList = new ArrayList<AlgoResults>();
        if (videosRequest.getAlgoResultsRequest() != null){
            for (AlgoResultsRequest algoResultsRequest : videosRequest.getAlgoResultsRequest()){
                AlgoResults algoResults = new AlgoResults();
                algoResults.setProductName(algoResultsRequest.getProductName());
                algoResults.setProductImage(algoResultsRequest.getProductImage());
                algoResults.setVideos(video);

                algoResultsList.add(algoResults);
            }

            algoResultsRepo.saveAll(algoResultsList);
        }

        return video;
    }

    public Videos saveVideoWithResults(UploadResource uploadResource) {

        Videos video = new Videos();
        video.setVideoFile(uploadResource.getVideoFile());
        video.setRecordDate(uploadResource.getRecordDate());
        video.setStartTime(uploadResource.getStartTime());
        video.setEndTime(uploadResource.getEndTime());
        repo.save(video);

        List<VideoResults> videoResultsList = new ArrayList<VideoResults>();
        if (uploadResource.getVideoResultsRequest() != null){
            for (VideoResultsRequest videoResultsRequest : uploadResource.getVideoResultsRequest()){
                VideoResults videoResults = new VideoResults();
                videoResults.setPickedProduct(videoResultsRequest.getPickedProduct());
                videoResults.setTotalCases(videoResultsRequest.getTotalCases());
                videoResults.setVideos(video);
                videoResultsList.add(videoResults);
            }
            videoResultsRepo.saveAll(videoResultsList);
        }

        List<AlgoResults> algoResultsList = new ArrayList<AlgoResults>();
        if (uploadResource.getAlgoResultsRequest() != null){
            for (AlgoResultsRequest algoResultsRequest : uploadResource.getAlgoResultsRequest()){
                AlgoResults algoResults = new AlgoResults();
                algoResults.setProductName(algoResultsRequest.getProductName());
                algoResults.setProductImage(algoResultsRequest.getProductImage());
                algoResults.setVideos(video);
                algoResultsList.add(algoResults);
            }
            algoResultsRepo.saveAll(algoResultsList);
        }
        pickSheetService.savePickSheetWithDetails(video, uploadResource);
        return video;
    }
}
