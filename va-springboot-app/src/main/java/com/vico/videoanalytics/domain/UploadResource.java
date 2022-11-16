package com.vico.videoanalytics.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UploadResource {

    private String pickSheetNumber;
    private String shipmentNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pickSheetDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deliveryDate;
    private String routeID;
    private int bay;
    private int bin;
    private int quantity;
    private List<PickSheetDetailsRequest> pickSheetDetailsRequest;
    private String VideoFile;
    private Date recordDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private List<VideoResultsRequest> videoResultsRequest;
    private List<AlgoResultsRequest> algoResultsRequest;
}
