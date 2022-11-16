package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.PickSheet;
import com.vico.videoanalytics.domain.PickSheetDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickSheetDetailsRepo extends JpaRepository<PickSheetDetails, Long> {
    List<PickSheetDetails> findByPickSheet(PickSheet pickSheet);

}
