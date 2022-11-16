package com.vico.videoanalytics.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "Videos")
@Getter
@Setter
@ToString
public class Videos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String videoFile;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date recordDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Boolean deleted;

    private Boolean assigned;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VideoResults> videoResults;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlgoResults> algoResults;

    @JsonIgnore
    @OneToOne(cascade =  CascadeType.ALL,
            mappedBy = "videos")
    private PickSheet pickSheet;

//    @JsonIgnore
//    @OneToOne(optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "pickSheetId", referencedColumnName = "pickSheetId", nullable = false)
//    private PickSheet pickSheet;

    public Videos(VideosRequest videosRequest){
        this.videoFile = videosRequest.getVideoFile();
        this.startTime = videosRequest.getStartTime();
        this.endTime = videosRequest.getEndTime();
        this.recordDate = videosRequest.getRecordDate();

    }

    public Videos() {
    }

    public Videos(Long id, String videoFile, Date recordDate, LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.videoFile = videoFile;
        this.recordDate = recordDate;
        this.startTime = startTime;
        this.endTime = endTime;

    }




}
