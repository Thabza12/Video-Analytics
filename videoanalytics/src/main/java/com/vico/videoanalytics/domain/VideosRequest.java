package com.vico.videoanalytics.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class VideosRequest {

    private String VideoFile;
    private Date recordDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private List<VideoResultsRequest> videoResultsRequest;
    private List<AlgoResultsRequest> algoResultsRequest;

}
