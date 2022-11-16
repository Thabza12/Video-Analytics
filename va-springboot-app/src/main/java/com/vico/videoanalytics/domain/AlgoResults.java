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
@Table(name = "AlgoResults")
@Getter
@Setter
@ToString
public class AlgoResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productImage;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Boolean deleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "videosId", referencedColumnName = "id")
    private Videos videos;

    public AlgoResults() {
    }

    public AlgoResults(Long id, String productName, String productImage) {
        this.id = id;
        this.productName = productName;
        this.productImage = productImage;

    }

}
