package com.vico.videoanalytics.controller;

import com.vico.videoanalytics.domain.AlgoResults;
import com.vico.videoanalytics.exception.ResourceNotFoundException;
import com.vico.videoanalytics.service.AlgoResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AlgoResultsController {

    @Autowired
    private AlgoResultsService service;


    @GetMapping("/algoResults")
    public Iterable<AlgoResults> getAllAlgoResults(){
        return service.getAllAlgoResults();
    }


    @GetMapping("/algoResults/{id}")
    public ResponseEntity<Object> getAlgoResultsById(@PathVariable(value = "id") Long id)
            throws Throwable {
        Object algoResults = service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AlgoResults not found for this id :: " + id));
        return ResponseEntity.ok().body(algoResults);
    }


    @PutMapping("/algoResults/{id}")
    public ResponseEntity<AlgoResults> updateAlgoResults(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody AlgoResults algoResultInfo) throws Throwable {
        AlgoResults algoResults = (AlgoResults) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AlgoResults not found for this id :: " + id));

        algoResults.setProductName(algoResultInfo.getProductName());
        algoResults.setProductImage(algoResultInfo.getProductImage());

        final AlgoResults updatedAlgoResults = service.updateAlgoResults(algoResults);
        return ResponseEntity.ok(updatedAlgoResults);
    }

    @DeleteMapping("/algoResults/{id}")
    public Map<String, Boolean> deleteAlgoResults(@PathVariable(value = "id") Long id)
            throws Throwable {
        AlgoResults algoResults = (AlgoResults) service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AlgoResults not found for this id :: " + id));

        service.deleteAlgoResults(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
