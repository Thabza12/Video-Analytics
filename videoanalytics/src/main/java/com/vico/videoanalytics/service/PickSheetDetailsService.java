package com.vico.videoanalytics.service;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.PickSheetDetails;
import com.vico.videoanalytics.repository.PickSheetDetailsRepo;
import com.vico.videoanalytics.repository.PickSheetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PickSheetDetailsService {

    @Autowired
    private PickSheetDetailsRepo repo;

    @Autowired
    private PickSheetRepo pickSheetRepo;
    public Iterable<PickSheetDetails> getAllPickSheetDetails() {
        return repo.findAll();
    }

    public Optional findById(Long id) {
        return repo.findById(id);
    }

    public List<PickSheetDetails> findByPickSheet(PickSheet pickSheet){
        return repo.findByPickSheet(pickSheet);
    }

    public PickSheetDetails updatePickSheetDetails(PickSheetDetails pickSheetDetails) {
        return repo.save(pickSheetDetails);
    }

    public void deletePickSheetDetails(Long id) {
        PickSheetDetails pickSheetDetails = repo.findById(id).get();
        pickSheetDetails.setDeleted(true);

        PickSheet pickSheet = pickSheetRepo.getReferenceById(id);
        pickSheet.setDeleted(true);

        repo.save(pickSheetDetails);
    }
}
