package com.vico.videoanalytics.controller;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.PickSheetDetails;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.repository.PickSheetDetailsRepo;
import com.vico.videoanalytics.repository.PickSheetRepo;
import com.vico.videoanalytics.service.PickSheetDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PickSheetDetailsController {

    @Autowired
    private PickSheetDetailsService service;

    @Autowired
    private PickSheetRepo pickSheetRepo;


    @GetMapping("/pickSheetDetails")
    public Iterable<PickSheetDetails> getAllPickSheetDetails(){
        return service.getAllPickSheetDetails();
    }


    @GetMapping("/pickSheetDetails/{id}")
    public ResponseEntity<Object> getPickSheetDetailsById(@PathVariable(value = "id") Long id)
            throws Throwable {
        Object pickSheetDetails = service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheetDetails not found for this id :: " + id));
        return ResponseEntity.ok().body(pickSheetDetails);
    }


    @GetMapping("/pickSheetDetailsByPickSheet/{pickSheetId}")
    public List<PickSheetDetails> getPickSheetDetailsByPickSheet(@PathVariable(value = "pickSheetId") Long pickSheetId) {
        PickSheet pickSheet = pickSheetRepo.findByPickSheetIDIs(pickSheetId);
        return service.findByPickSheet(pickSheet);
    }


    @PutMapping("/pickSheetDetails/{id}")
    public ResponseEntity<PickSheetDetails> updatePickSheetDetails(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody PickSheetDetails pickSheetDetailsInfo) throws Throwable {
        PickSheetDetails pickSheetDetails = (PickSheetDetails) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheetDetails not found for this id :: " + id));

        pickSheetDetails.setZone(pickSheetDetailsInfo.getZone());
        pickSheetDetails.setSKU(pickSheetDetailsInfo.getSKU());
        pickSheetDetails.setFlavour(pickSheetDetailsInfo.getFlavour());
        pickSheetDetails.setPack(pickSheetDetailsInfo.getPack());
        pickSheetDetails.setHands(pickSheetDetailsInfo.getHands());
        pickSheetDetails.setLayers(pickSheetDetailsInfo.getLayers());
        pickSheetDetails.setTotalCases(pickSheetDetailsInfo.getTotalCases());

        final PickSheetDetails updatedPickSheetDetails = service.updatePickSheetDetails(pickSheetDetails);
        return ResponseEntity.ok(updatedPickSheetDetails);
    }

    @DeleteMapping("/pickSheetDetails/{id}")
    public Map<String, Boolean> deletePickSheetDetails(@PathVariable(value = "id") Long id)
            throws Throwable {
        PickSheetDetails pickSheetDetails = (PickSheetDetails) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PickSheetDetails not found for this id :: " + id));

        service.deletePickSheetDetails(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
