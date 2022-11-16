package com.vico.videoanalytics.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "VideoResults")
@Getter
@Setter
@ToString
public class VideoResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pickedProduct;
    private int totalCases;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Boolean deleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "videosId", referencedColumnName = "id")
    private Videos videos;

    public VideoResults() {
    }

    public VideoResults(Long id, String pickedProduct, int totalCases) {
        this.id = id;
        this.pickedProduct = pickedProduct;
        this.totalCases = totalCases;

    }


}
