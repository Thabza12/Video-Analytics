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
@Table(name = "PickSheetDetails")
@Getter
@Setter
@ToString
public class PickSheetDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String zone;
    private String pack;
    private String flavour;
    private int hands;
    private int layers;
    private int totalCases;
    private String SKU;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Boolean deleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "pickSheetId", referencedColumnName = "pickSheetId")
    private PickSheet pickSheet;


    public PickSheetDetails() {
    }

    public PickSheetDetails(Long id, String zone, String pack, String flavour, int hands, int layers, int totalCases, String SKU) {
        this.id = id;
        this.zone = zone;
        this.pack = pack;
        this.flavour = flavour;
        this.hands = hands;
        this.layers = layers;
        this.totalCases = totalCases;
        this.SKU = SKU;
    }


}
