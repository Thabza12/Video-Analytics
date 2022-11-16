import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { pickSheet } from '../pick-sheet';

export interface DailogData{
  id: number;
}

@Component({
  selector: 'app-unassigned-pick-sheets',
  templateUrl: './unassigned-pick-sheets.component.html',
  styleUrls: ['./unassigned-pick-sheets.component.css']
})
export class unassignedPickSheetsComponent implements OnInit {

  @Input() assignPickSheet = [];
  @Output() onSelected = new EventEmitter<any>();
  pickSheets: pickSheet[] = []
  pickSheet: pickSheet = new pickSheet();
  selectedPickSheet: any;
  totalRecords!: any;
  page: number=1;

  constructor(private _service: appServiceService,
              public dialogRef: MatDialogRef<unassignedPickSheetsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DailogData,
              private _router: Router) { }

  ngOnInit(): void {
    this.getUnassignedPickSheets();
  }

  private getUnassignedPickSheets() {
    this._service.getUnassignedPickSheets().subscribe(data => {
      this.pickSheets = data
      this.totalRecords = data.length
    })
  }

  onSelectedPickSheet(pickSheet: any){
    this.selectedPickSheet = pickSheet;
  }

  onSubmit(id: number){
    console.log("in submit ",id, this.data.id)
    this._service.assignVideo(id, this.data.id);
    this.dialogRef.close(id);
    this._router.navigate(['/videos'])
  }

  cancel(){
    this.dialogRef.close();
  }

}
