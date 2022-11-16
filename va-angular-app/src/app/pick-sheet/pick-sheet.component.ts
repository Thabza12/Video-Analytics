import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { pickSheet } from '../pick-sheet';
import { Location } from '@angular/common';
import { pickSheetDetailsComponent } from '../pick-sheet-details/pick-sheet-details.component';
import { updatePickSheetComponent } from '../update-pick-sheet/update-pick-sheet.component';

@Component({
  selector: 'app-pick-sheet',
  templateUrl: './pick-sheet.component.html',
  styleUrls: ['./pick-sheet.component.css']
})
export class pickSheetComponent implements OnInit {

  pickSheets: pickSheet[] = []
  pickSheet: pickSheet = new pickSheet();
  totalRecords!: any;
  page: number=1;

  constructor(private _service: appServiceService,
    public dialog: MatDialog,
    private _location: Location,
    private _router: Router) {
      this._service.listen().subscribe((m:any)=>{
        console.log(m);
        this.getPickSheets();
      })
     }



  ngOnInit(): void {
    this.getPickSheets();
  }

  private getPickSheets() {
    this._service.getPickSheets().subscribe((data) => {
      this.pickSheets = data
      this.totalRecords = data.length
    })
  }

  openDialog(id: number) {

    console.log(id)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    let selectedPickSheet: pickSheet = new pickSheet();

    for (let p = 0; p < this.pickSheets.length; p++) {
      console.log(this.pickSheets[p]);
      if (id == this.pickSheets[p].id) {
        selectedPickSheet = this.pickSheets[p];
      }
      
    }

    dialogConfig.data = {
      id: selectedPickSheet.id,
      shipment_number: selectedPickSheet.shipment_number,
      pick_sheet_number: selectedPickSheet.pick_sheet_number,
      pick_sheet_date: selectedPickSheet.pick_sheet_date,
      delivery_date: selectedPickSheet.delivery_date,
      routeID: selectedPickSheet.routeID,
      bay: selectedPickSheet.bay,
      bin: selectedPickSheet.bin,
      quantity: selectedPickSheet.quantity
    }

    const dialogRef = this.dialog.open(updatePickSheetComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      console.log("Dialog output: ", data);

      let result: pickSheet = new pickSheet();
      result = data;

      for (let index = 0; index < this.pickSheets.length; index++) {
        const element = this.pickSheets[index];
        if (result.id == element.id) {
          this.pickSheets[index].shipment_number = result.shipment_number;
          this.pickSheets[index].pick_sheet_number = result.pick_sheet_number;
          this.pickSheets[index].pick_sheet_date = result.pick_sheet_date;
          this.pickSheets[index].delivery_date = result.delivery_date;
          this.pickSheets[index].routeID = result.routeID;
          this.pickSheets[index].bay = result.bay;
          this.pickSheets[index].bin = result.bin;
          this.pickSheets[index].quantity = result.quantity;
        }
        
      }
      console.log(this.pickSheets);
      // this.refresh();
    }
      
    );
  }

  // refresh(): void{
  //   this._router.navigateByUrl("/update-pick-sheet", {skipLocationChange: true}).then(() => {
  //     console.log(decodeURI(this._location.path()));
  //     this._router.navigate([decodeURI(this._location.path())]);
  //   });

  // }

  deletePickSheet(id: number) {
    this._service.deletePickSheet(id).subscribe(data => {
      console.log(data);
      this.getPickSheets();
    })
  }

  details(id: number){

    console.log(id);

    this._service.getDetailsByPickSheet(id).subscribe(data =>{
      console.log(data);
    } )

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      id: id
    }

    const dialogRef = this.dialog.open(pickSheetDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      console.log("Dialog output: ", data);
    });

  }
  


}
