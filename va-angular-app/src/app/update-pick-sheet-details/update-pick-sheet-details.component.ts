import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { pickSheetDetails } from '../pick-sheet-details';

export interface DailogData {
  id: number,
  zone: string,
  pack: string,
  flavour: string,
  hands: number,
  layers: number,
  // total_cases: number,
  sku: string,
}

@Component({
  selector: 'app-update-pick-sheet-details',
  templateUrl: './update-pick-sheet-details.component.html',
  styleUrls: ['./update-pick-sheet-details.component.css']
})
export class updatePickSheetDetailsComponent implements OnInit {

  updatePickSheetDetailsForm = new UntypedFormGroup({});
  pickSheetDetails: pickSheetDetails = new pickSheetDetails();
  id!: number;

  constructor(private _service: appServiceService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<updatePickSheetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) { }

  ngOnInit(): void {

    this.updatePickSheetDetailsForm = this._fb.group({
      'zone': new UntypedFormControl(this.data.zone),
      'pack': new UntypedFormControl(this.data.pack),
      'flavour': new UntypedFormControl(this.data.flavour),
      'hands': new UntypedFormControl(this.data.hands),
      'layers': new UntypedFormControl(this.data.layers),
      // 'total_cases': new UntypedFormControl(this.data.total_cases),
      'sku': new UntypedFormControl(this.data.sku),
    });
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit() {
  
    this._service.updatePicksheetDetails(this.data.id, this.updatePickSheetDetailsForm.value).subscribe(data => {
      console.log("updated successful", data)
      this.dialogRef.close(data);
    },
      error => console.log(error));
      console.log("modal box closed")
  }


  gotToViewPickSheetDetails() {
    this._router.navigate(['/pick-sheets-details']);
  }

}
