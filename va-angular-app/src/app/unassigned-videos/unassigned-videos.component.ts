import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { appServiceService } from '../app-service.service';
import { unassignedPickSheetsComponent } from '../unassigned-pick-sheets/unassigned-pick-sheets.component';
import { video } from '../video';

@Component({
  selector: 'app-unassigned-videos',
  templateUrl: './unassigned-videos.component.html',
  styleUrls: ['./unassigned-videos.component.css']
})
export class unassignedVideosComponent implements OnInit {

  @Input() assignVideo = [];
  @Output() onSelected = new EventEmitter<any>();
  videos: video[] = []
  video: video = new video();
  selectedVideo: any;
  totalRecords!: any;
  page: number=1;

  constructor(private _service: appServiceService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVideos();
  }

  private getVideos() {
    this._service.getVideos().subscribe(data => {
      this.videos = data;
      this.totalRecords = data.length
    })
  }

  openDialog(id: number) {

    console.log(id);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    let selectedVideo: video = new video();

    for (let v=0; v<this.videos.length; v++){
      
      if (id == this.videos[v].id) {
        selectedVideo = this.videos[v];
      }
      this.onSelectedVideo(selectedVideo.id);

    }

    dialogConfig.data = {
      id: selectedVideo.id
    }

    const dialogRef = this.dialog.open(unassignedPickSheetsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      console.log("Dialog output: ", data);
    }); 
  }

  onSelectedVideo(video: any){
    this.selectedVideo = video;
  }

}
