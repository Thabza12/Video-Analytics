package com.vico.videoanalytics.service;

import com.vico.videoanalytics.domain.*;
import com.vico.videoanalytics.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PickSheetService {

    @Autowired
    private PickSheetRepo pickSheetRepo;

    @Autowired
    private VideosRepo videosRepo;

    @Autowired
    private PickSheetDetailsRepo pickSheetDetailsRepo;

    @Autowired
    private VideoResultsRepo videoResultsRepo;

    public PickSheet updatePickSheet(PickSheet pickSheet){
        return pickSheetRepo.save(pickSheet);
    }

    public PickSheet uploadPickSheet(Long id, PickSheetRequest pickSheetRequest){
        PickSheet pickSheet = new PickSheet(pickSheetRequest);
        pickSheet.setVideos(videosRepo.findByIdIs(id));
        pickSheetRepo.save(pickSheet);

        List<PickSheetDetails> pickSheetDetailsList = new ArrayList<PickSheetDetails>();
        if (pickSheetRequest.getPickSheetDetailsRequest() != null){
            for (PickSheetDetailsRequest pickSheetDetailsRequest : pickSheetRequest.getPickSheetDetailsRequest()){
                PickSheetDetails pickSheetDetails = new PickSheetDetails();
                pickSheetDetails.setZone(pickSheetDetailsRequest.getZone());
                pickSheetDetails.setFlavour(pickSheetDetailsRequest.getFlavour());
                pickSheetDetails.setHands(pickSheetDetailsRequest.getHands());
                pickSheetDetails.setLayers(pickSheetDetailsRequest.getLayers());
                pickSheetDetails.setPack(pickSheetDetailsRequest.getPack());
                pickSheetDetails.setTotalCases(pickSheetDetailsRequest.getTotalCases());
                pickSheetDetails.setSKU(pickSheetDetailsRequest.getSKU());
                pickSheetDetails.setPickSheet(pickSheet);
                pickSheetDetailsList.add(pickSheetDetails);
            }
            pickSheetDetailsRepo.saveAll(pickSheetDetailsList);
        }
        return pickSheet;
    }

    public Iterable<PickSheet> getAllPickSheets(){
        return pickSheetRepo.findAll();
    }

    public Optional findById(Long pickSheetID) {
        return pickSheetRepo.findById(pickSheetID);

    }



    public PickSheet findByVideo(Videos id){
        return pickSheetRepo.findByVideos(id);
    }

    public List<PickSheet> unassigned(){
        return pickSheetRepo.getPickSheetsByVideos();
    }

    public void deletePickSheet(Long id) {
        PickSheet pickSheet = pickSheetRepo.findById(id).get();
        pickSheet.setDeleted(true);

        for(PickSheetDetails pickSheetDetails : pickSheet.getPickSheetDetails()) {
            pickSheetDetails.setDeleted(true);
        }

//        for (VideoResults videoResults : pickSheet.getVideoResults()){
//            videoResults.setDeleted(true);
//        }
//
//        for(AlgoResults algoResults : pickSheet.getAlgoResults()){
//            algoResults.setDeleted(true);
//        }

        Videos video = videosRepo.getReferenceById(id);
        video.setDeleted(true);

        pickSheetRepo.save(pickSheet);
    }

    public PickSheet savePickSheetWithDetails(PickSheetRequest request) {

        PickSheet pickSheet = new PickSheet(request);
        pickSheetRepo.save(pickSheet);

        List<PickSheetDetails> pickSheetDetailsList = new ArrayList<PickSheetDetails>();
        if (request.getPickSheetDetailsRequest() != null){
            for (PickSheetDetailsRequest pickSheetDetailsRequest : request.getPickSheetDetailsRequest()){
                PickSheetDetails pickSheetDetails = new PickSheetDetails();
                pickSheetDetails.setZone(pickSheetDetailsRequest.getZone());
                pickSheetDetails.setFlavour(pickSheetDetailsRequest.getFlavour());
                pickSheetDetails.setHands(pickSheetDetailsRequest.getHands());
                pickSheetDetails.setLayers(pickSheetDetailsRequest.getLayers());
                pickSheetDetails.setPack(pickSheetDetailsRequest.getPack());
                pickSheetDetails.setTotalCases(pickSheetDetailsRequest.getTotalCases());
                pickSheetDetails.setSKU(pickSheetDetailsRequest.getSKU());
                pickSheetDetails.setPickSheet(pickSheet);

                pickSheetDetailsList.add(pickSheetDetails);

            }

            pickSheetDetailsRepo.saveAll(pickSheetDetailsList);

        }
        return pickSheet;
    }

//    public PickSheet assignVideoToPickSheet(Long pickSheetId, Long id){
//        PickSheet pickSheet = pickSheetRepo.findByIdIs(pickSheetId);
//        if (pickSheet != null){
//            pickSheet.setVideos(videosRepo.findByIdIs(id));
//        }
//
//        return pickSheetRepo.save(pickSheet);
//    }
}
