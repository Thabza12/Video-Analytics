package com.vico.videoanalytics.repository;

import com.vico.videoanalytics.domain.AlgoResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgoResultsRepo extends JpaRepository<AlgoResults, Long> {

}
