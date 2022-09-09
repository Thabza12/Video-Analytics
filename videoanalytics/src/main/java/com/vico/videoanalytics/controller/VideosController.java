package com.vico.videoanalytics.controller;

import com.vico.videoanalytics.domain.UploadResource;
import com.vico.videoanalytics.domain.Videos;
import com.vico.videoanalytics.domain.VideosRequest;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.service.VideosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class VideosController {

    @Autowired
    private VideosService service;

    @GetMapping("/videos")
    public Iterable<Videos> getAllVideos(){
        return service.getAllVideos();
    }

    @PostMapping("/uploadVideo")
    public Videos uploadVideoWithResults(@RequestBody UploadResource uploadResource){
        return service.saveVideoWithResults(uploadResource);
    }

    @PostMapping("/saveVideo")
    public Videos saveVideo(@RequestBody VideosRequest videosRequest){
        return service.uploadVideos(videosRequest);
    }

    @GetMapping("/videos/{id}")
    public ResponseEntity<Object> getVideosById(@PathVariable(value = "id") Long id)
            throws Throwable {
        Object videos = service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found for this id :: " + id));
        return ResponseEntity.ok().body(videos);
    }


    @PutMapping("/videos/{id}")
    public ResponseEntity<Videos> updateVideo(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Videos videoDetails) throws Throwable {
        Videos video = (Videos) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found for this id :: " + id));

        video.setVideoFile(videoDetails.getVideoFile());
        video.setRecordDate(videoDetails.getRecordDate());
        video.setStartTime(videoDetails.getStartTime());
        video.setEndTime(videoDetails.getEndTime());

        final Videos updatedVideo = service.updateVideo(video);
        return ResponseEntity.ok(updatedVideo);
    }

    @DeleteMapping("/videos/{id}")
    public Map<String, Boolean> deleteVideo(@PathVariable(value = "id") Long id)
            throws Throwable {
        Videos video = (Videos) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found for this id :: " + id));

        service.deleteVideo(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
