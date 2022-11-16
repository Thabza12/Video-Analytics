package com.vico.videoanalytics.controller;

import javax.validation.Valid;

import com.vico.videoanalytics.domain.*;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.repository.PickSheetRepo;
import com.vico.videoanalytics.service.PickSheetService;
import com.vico.videoanalytics.service.VideosService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class PickSheetController {

    @Autowired
    private PickSheetService service;

    @Autowired
    private PickSheetRepo repo;

    @Autowired
    private VideosService videosService;


    @GetMapping("/pickSheets")
    public Iterable<PickSheet> getAllPickSheets(){
        return service.getAllPickSheets();
    }

    @PostMapping("/savePickSheet")
    public PickSheet savePickSheet(@RequestBody PickSheetRequest pickSheetRequest){
//        log.debug("Entering pickSheet");
        return service.savePickSheetWithDetails(pickSheetRequest);
    }

    @PostMapping("/assign/pickSheet/{pickSheetId}/video/{id}")
    public PickSheet assign(@PathVariable(value = "pickSheetId") Long pickSheetId, @PathVariable(value = "id") Long id){
        log.debug("Entering pickSheet assignment");
        PickSheet pickSheet = repo.findByPickSheetIDIs(pickSheetId);
//                .orElseThrow(() -> new ResourceNotFoundException("PickSheet not found for this id :: " + pickSheetId));
        if (pickSheet == pickSheet){
            log.debug("Found pickSheet to assignment");
            Videos video = videosService.findByIdIs(id);
            pickSheet.setVideos(video);
            video.setAssigned(true);
        }
        log.debug("Assigned video to pickSheet");

        return service.updatePickSheet(pickSheet);
    }


    @GetMapping("/pickSheet/{pickSheetId}")
    public ResponseEntity<Object> getPickSheetById(@PathVariable(value = "pickSheetId") Long pickSheetId)
            throws Throwable {
        Object pickSheet = service.findById(pickSheetId)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheet not found for this id :: " + pickSheetId));
        return ResponseEntity.ok().body(pickSheet);
    }

    @GetMapping("/pickSheetByVideo/{id}")
    public ResponseEntity<Object> getPickSheetByVideo(@PathVariable(value = "id") Videos id){
        Object pickSheet = service.findByVideo(id);
        return ResponseEntity.ok().body(pickSheet);
    }

    @GetMapping("/unassigned/pickSheets")
    public ResponseEntity<Object> unassignedPickSheet(){
        Object pickSheet = service.unassigned();
        return ResponseEntity.ok().body(pickSheet);
    }


    @PutMapping("/pickSheet/{pickSheetId}")
    public ResponseEntity<PickSheet> updatePickSheet(@PathVariable(value = "pickSheetId") Long pickSheetId,
                                                                   @Valid @RequestBody PickSheet pickSheetInfo) throws Throwable {
        PickSheet pickSheet =  (PickSheet) service.findById(pickSheetId)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheet not found for this id :: " + pickSheetId));

        pickSheet.setPickSheetDate(pickSheetInfo.getPickSheetDate());
        pickSheet.setPickSheetNumber(pickSheetInfo.getPickSheetNumber());
        pickSheet.setBay(pickSheetInfo.getBay());
        pickSheet.setBin(pickSheetInfo.getBin());
        pickSheet.setRouteID(pickSheetInfo.getRouteID());
        pickSheet.setQuantity(pickSheetInfo.getQuantity());
        pickSheet.setDeliveryDate(pickSheetInfo.getDeliveryDate());
        pickSheet.setShipmentNumber(pickSheetInfo.getShipmentNumber());

        final PickSheet updatedPickSheet = service.updatePickSheet(pickSheet);
        return ResponseEntity.ok(updatedPickSheet);
    }

    @DeleteMapping("/pickSheet/{pickSheetId}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable(value = "pickSheetId") Long pickSheetId)
            throws Throwable {
        PickSheet pickSheet = (PickSheet) service.findById(pickSheetId)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheet not found for this id :: " + pickSheetId));

        service.deletePickSheet(pickSheetId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
