package com.vico.videoanalytics.controller;

import javax.validation.Valid;

import com.vico.videoanalytics.domain.*;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.service.PickSheetService;
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


    @GetMapping("/pickSheets")
    public Iterable<PickSheet> getAllPickSheets(){
        return service.getAllPickSheets();
    }

    @PostMapping("/savePickSheet/{id}")
    public PickSheet savePickSheet(@PathVariable(value = "id") Long id, @RequestBody PickSheetRequest pickSheetRequest){
//        log.debug("Entering pickSheet");
        return service.uploadPickSheet(id, pickSheetRequest);
    }


    @GetMapping("/pickSheet/{pickSheetId}")
    public ResponseEntity<Object> getPickSheetById(@PathVariable(value = "pickSheetId") Long pickSheetId)
            throws Throwable {
        Object pickSheet = service.findById(pickSheetId)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheet not found for this id :: " + pickSheetId));
        return ResponseEntity.ok().body(pickSheet);
    }


    @PutMapping("/pickSheet/{pickSheetId}")
    public ResponseEntity<PickSheet> updatePickSheet(@PathVariable(value = "id") Long id,
                                                                   @Valid @RequestBody PickSheet pickSheetInfo) throws Throwable {
        PickSheet pickSheet = (PickSheet) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheetDetails not found for this id :: " + id));

        pickSheet.setPickSheetDate(pickSheetInfo.getPickSheetDate());
        pickSheet.setPickSheetNumber(pickSheetInfo.getPickSheetNumber());
        pickSheet.setBay(pickSheetInfo.getBay());
        pickSheet.setBin(pickSheetInfo.getBin());
        pickSheet.setRouteID(pickSheetInfo.getRouteID());
        pickSheet.setQuantity(pickSheetInfo.getQuantity());
        pickSheet.setDeliveryDate(pickSheetInfo.getDeliveryDate());
        pickSheet.setShipmentNumber(pickSheetInfo.getShipmentNumber());

        final PickSheet updatedPickSheet = service.updatePickSheet(pickSheetInfo);
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
