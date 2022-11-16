import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { appServiceService } from '../app-service.service';
import { pickSheet } from '../pick-sheet';

export interface DailogData {
  id: number,
  shipment_number: string,
  pick_sheet_number: string,
  pick_sheet_date: Date,
  delivery_date: Date,
  routeID: string,
  bay: number,
  bin: number,
  quantity: number
}

@Component({
  selector: 'app-update-pick-sheet',
  templateUrl: './update-pick-sheet.component.html',
  styleUrls: ['./update-pick-sheet.component.css']
})
export class updatePickSheetComponent implements OnInit {

  updatePickSheetForm = new UntypedFormGroup({});
  pickSheet: pickSheet = new pickSheet();
  pickSheetID!: number;

  constructor(private _service: appServiceService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _location: Location,
    public dialogRef: MatDialogRef<updatePickSheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) { }

  ngOnInit(): void {

    this.dialogRef.disableClose = true;

    this.updatePickSheetForm = this._fb.group({
      'shipment_number': new UntypedFormControl(this.data.shipment_number),
      'pick_sheet_number': new UntypedFormControl(this.data.pick_sheet_number),
      'pick_sheet_date': new UntypedFormControl(this.data.pick_sheet_date),
      'delivery_date': new UntypedFormControl(this.data.delivery_date),
      'routeID': new UntypedFormControl(this.data.routeID),
      'bay': new UntypedFormControl(this.data.bay),
      'bin': new UntypedFormControl(this.data.bin),
      'quantity': new UntypedFormControl(this.data.quantity)
    });

  }

  cancel(): void{
    this.dialogRef.close();
  }

  onSubmit() {
    
    this._service.updatePicksheets(this.data.id, this.updatePickSheetForm.value).subscribe(data => {
      console.log("updated successful ", data);
      this.dialogRef.close(data);
      this._service.filter("updating")
      // this.refresh();
    },
      error => console.log(error));
      console.log("Closing modal box");
    
  }

  // refresh(): void{
  //   this._router.navigateByUrl("/update-pick-sheet", {skipLocationChange: true}).then(() => {
  //     console.log(decodeURI(this._location.path()));
  //     this._router.navigate([decodeURI(this._location.path())]);
  //   });

  // }


  gotToViewPickSheet() {
    this._router.navigate(['/pick-sheets']);
  }

}
