package com.vico.videoanalytics.controller;

import com.vico.videoanalytics.domain.VideoResults;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.service.VideoResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class VideoResultsController {

    @Autowired
    private VideoResultsService service;


    @GetMapping("/videoResults")
    public Iterable<VideoResults> getAllVideoResults(){
        return service.getAllVideoResults();
    }

    @GetMapping("/videoResults/{id}")
    public ResponseEntity<Object> getVideoResultsById(@PathVariable(value = "id") Long id)
            throws Throwable {
        Object videoResults = service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video Results not found for this id :: " + id));
        return ResponseEntity.ok().body(videoResults);
    }


    @PutMapping("/videoResults/{id}")
    public ResponseEntity<VideoResults> updateVideoResults(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody VideoResults videoResultsInfo) throws Throwable {
        VideoResults videoResults = (VideoResults) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video Results not found for this id :: " + id));

        videoResults.setPickedProduct(videoResultsInfo.getPickedProduct());
        videoResults.setTotalCases(videoResultsInfo.getTotalCases());

        final VideoResults updatedVideoResults = service.updateVideoResults(videoResults);
        return ResponseEntity.ok(updatedVideoResults);
    }

    @DeleteMapping("/videoResults/{id}")
    public Map<String, Boolean> deleteVideoResults(@PathVariable(value = "id") Long id)
            throws Throwable {
        VideoResults videoResults = (VideoResults) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video Results not found for this id :: " + id));

        service.deleteVideoResults(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
