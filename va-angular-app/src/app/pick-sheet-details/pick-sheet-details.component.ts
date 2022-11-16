import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { appServiceService } from '../app-service.service';
import { pickSheetDetails } from '../pick-sheet-details';
import { updatePickSheetDetailsComponent } from '../update-pick-sheet-details/update-pick-sheet-details.component';

export interface DailogData {
  id: number;
}

@Component({
  selector: 'app-pick-sheet-details',
  templateUrl: './pick-sheet-details.component.html',
  styleUrls: ['./pick-sheet-details.component.css']
})
export class pickSheetDetailsComponent implements OnInit {

  pickSheetDetails: pickSheetDetails[] = []
  pickSheetDetail: pickSheetDetails = new pickSheetDetails();
  totalRecords!: any;
  page: number = 1;

  constructor(private _service: appServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<pickSheetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) { }

  ngOnInit(): void {
    this._service.getDetailsByPickSheet(this.data.id).subscribe(data => {
      this.pickSheetDetails = data;
    }, error => console.log(error));
  }

  openDialog(id: number) {

    console.log(id)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    let selectedPickSheetDetails: pickSheetDetails = new pickSheetDetails();

    for (let pd = 0; pd < this.pickSheetDetails.length; pd++) {
      console.log(this.pickSheetDetails[pd]);
      if (id == this.pickSheetDetails[pd].id) {
        selectedPickSheetDetails = this.pickSheetDetails[pd]

      }

    }

    dialogConfig.data = {
      id: selectedPickSheetDetails.id,
      zone: selectedPickSheetDetails.zone,
      pack: selectedPickSheetDetails.pack,
      flavour: selectedPickSheetDetails.flavour,
      hands: selectedPickSheetDetails.hands,
      layers: selectedPickSheetDetails.layers,
      // total_cases: (selectedPickSheetDetails.hands + selectedPickSheetDetails.layers),
      SKU: selectedPickSheetDetails.SKU,
    }

    const dialogRef = this.dialog.open(updatePickSheetDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data);

      let result: pickSheetDetails = new pickSheetDetails();
      result = data

      for (let index = 0; index < this.pickSheetDetails.length; index++) {
        const element = this.pickSheetDetails[index];
        if (result.id == element.id) {
          this.pickSheetDetails[index] = result;
        }

      }

      console.log(this.pickSheetDetails);
    }

    );
  }

  cancel(){
    this.dialogRef.close();
  }

  // deletePickSheetDetails(id: number) {
  //   this._service.deletePickSheetDetails(id).subscribe(data => {
  //     console.log(data);
  //   })
  // }

}
