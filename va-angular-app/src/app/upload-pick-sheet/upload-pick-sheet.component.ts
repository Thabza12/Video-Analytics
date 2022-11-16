import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { pickSheetDetails } from '../pick-sheet-details';
import { pickSheetResource } from '../pick-sheet-resource';
import { uploadPickSheetDetailsComponent } from '../upload-pick-sheet-details/upload-pick-sheet-details.component';

@Component({
  selector: 'app-upload-pick-sheet',
  templateUrl: './upload-pick-sheet.component.html',
  styleUrls: ['./upload-pick-sheet.component.css']
})
export class uploadPickSheetComponent implements OnInit {

  uploadPickSheetForm = new UntypedFormGroup({});
  pickSheetResource: pickSheetResource = new pickSheetResource();
  id!: number
  videoData: any
  pickSheetDetail: pickSheetDetails = new pickSheetDetails();
  pickSheetDetails: pickSheetDetails[] = [];

  constructor(private _formBuilder: UntypedFormBuilder,
              private _service: appServiceService,
              private _router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.uploadPickSheetForm = new UntypedFormGroup({
      'pick_sheet_number': new UntypedFormControl(),
      'shipment_number': new UntypedFormControl(),
      'pick_sheet_date': new UntypedFormControl(),
      'delivery_date': new UntypedFormControl(),
      'routeID': new UntypedFormControl(),
      'bay': new UntypedFormControl(),
      'bin': new UntypedFormControl(),
      'quantity': new UntypedFormControl()
    })
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    dialogConfig.data = this._formBuilder.group({
      id: this.pickSheetDetail.id,
      zone: this.pickSheetDetail.zone,
      pack: this.pickSheetDetail.pack,
      flavour: this.pickSheetDetail.flavour,
      hands: this.pickSheetDetail.hands,
      layers: this.pickSheetDetail.layers,
      SKU: this.pickSheetDetail.SKU
    })

    const dialogRef = this.dialog.open(uploadPickSheetDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      console.log("Dialog output: ", data);

      let result: pickSheetDetails = new pickSheetDetails();
      result = data;

      this.pickSheetDetails.push(result)
    }); 

  }

  onSubmit(formValue: UntypedFormGroup){

    const postBody = {
      pick_sheet_number: formValue.value.pick_sheet_number,
      shipment_number: formValue.value.shipment_number,
      pick_sheet_date: formValue.value.pick_sheet_date,
      delivery_date: formValue.value.delivery_date,
      routeID: formValue.value.routeID,
      bay: formValue.value.bay,
      bin: formValue.value.bin,
      quantity: formValue.value.quantity,
      details: this.pickSheetDetails,
    
    }
    
    this._service.uploadPickSheetResource(postBody).subscribe(data =>{
      console.log(data);
      this.gotToViewPickSheet();
    },
    error => console.log(error));

  }

  gotToViewPickSheet(){
    this._router.navigate(['/pick-sheets']);
  }

}
