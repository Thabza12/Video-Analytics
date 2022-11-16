import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DailogData{
  id: number;
  zone: string;
  pack: string;
  flavour: string;
  hands: number;
  layers: number;
  SKU: string;
}

@Component({
  selector: 'app-upload-pick-sheet-details',
  templateUrl: './upload-pick-sheet-details.component.html',
  styleUrls: ['./upload-pick-sheet-details.component.css']
})
export class uploadPickSheetDetailsComponent implements OnInit {

  uploadDetailsForm = new UntypedFormGroup({});

  constructor(public dialogRef: MatDialogRef<uploadPickSheetDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DailogData,
              private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;

    this.uploadDetailsForm = this._fb.group({
      'zone': new UntypedFormControl(this.data.zone),
      'pack': new UntypedFormControl(this.data.pack),
      'flavour': new UntypedFormControl(this.data.flavour),
      'hands': new UntypedFormControl(this.data.hands),
      'layers': new UntypedFormControl(this.data.layers),
      'SKU': new UntypedFormControl(this.data.SKU)

    });
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(form: UntypedFormGroup){
    console.log(form.value);
    this.dialogRef.close(form.value)
  }

}
