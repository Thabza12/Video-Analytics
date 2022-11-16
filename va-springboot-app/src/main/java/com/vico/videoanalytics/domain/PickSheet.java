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
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "PickSheet")
@Getter
@Setter
@ToString
public class PickSheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pickSheetID;
    private String pickSheetNumber;
    private String shipmentNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pickSheetDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deliveryDate;
    private String routeID;
    private int bay;
    private int bin;
    private int quantity;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Boolean deleted;

    @JsonIgnore
    @OneToMany(mappedBy = "pickSheet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PickSheetDetails> pickSheetDetails;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "videosId", referencedColumnName = "id")
    private Videos videos;

//    @JsonIgnore
//    @OneToOne(cascade =  CascadeType.ALL,
//            mappedBy = "pickSheet")
//    private Videos videos;

    public PickSheet(PickSheetRequest pickSheetRequest){
        this.bay = pickSheetRequest.getBay();
        this.bin = pickSheetRequest.getBin();
        this.quantity = pickSheetRequest.getQuantity();
        this.pickSheetDate = pickSheetRequest.getPickSheetDate();
        this.pickSheetNumber = pickSheetRequest.getPickSheetNumber();
        this.deliveryDate = pickSheetRequest.getDeliveryDate();
        this.routeID = pickSheetRequest.getRouteID();
        this.shipmentNumber = pickSheetRequest.getShipmentNumber();
    }

    public PickSheet() {
    }

    public PickSheet(Long pickSheetID, String pickSheetNumber, String shipmentNumber, Date pickSheetDate, Date deliveryDate, String routeID, int bay, int bin, int quantity) {
        this.pickSheetID = pickSheetID;
        this.pickSheetNumber = pickSheetNumber;
        this.shipmentNumber = shipmentNumber;
        this.pickSheetDate = pickSheetDate;
        this.deliveryDate = deliveryDate;
        this.routeID = routeID;
        this.bay = bay;
        this.bin = bin;
        this.quantity = quantity;
    }


}
