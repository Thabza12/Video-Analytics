package com.vico.videoanalytics.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PickSheetDetailsRequest {

    private String zone;
    private String pack;
    private String flavour;
    private int hands;
    private int layers;
    private int totalCases;
    private String SKU;
}
