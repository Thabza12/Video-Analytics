import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { updateVideoComponent } from '../update-video/update-video.component';
import { video } from '../video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class videoComponent implements OnInit {

  videos: video[] = []
  video: video = new video();
  totalRecords!: any;
  page: number=1;  

  constructor(private _service: appServiceService,
    private _router: Router,
    public dialog: MatDialog) {
      this._service.listen().subscribe((m:any)=>{
        console.log(m);
        this.getVideos();
      })
     }

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

    console.log(id)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    let selectedVideo: video = new video();

    for (let v=0; v<this.videos.length; v++){
      console.log(this.videos[v]);
      if (id == this.videos[v].id) {
        selectedVideo = this.videos[v];
      }

    }

    dialogConfig.data = {
      id: selectedVideo.id,
      video_file: selectedVideo.video_file,
      record_date: selectedVideo.record_date,
      start_time: selectedVideo.start_time,
      end_time: selectedVideo.end_time
    }

    const dialogRef = this.dialog.open(updateVideoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
      console.log("Dialog output: ", data);

      let result: video = new video();
      result = data;

      for (let index = 0; index < this.videos.length; index++) {
        const element = this.videos[index];
        if (result.id == element.id) {
          this.videos[index].video_file = result.video_file;
          this.videos[index].record_date = result.record_date;
          this.videos[index].start_time = result.start_time;
          this.videos[index].end_time = result.end_time;
        }
        
      }

      console.log(this.videos);
    }
      
    ); 

  }

  deleteVideo(id: number) {
    this._service.deleteVideo(id).subscribe(data => {
      console.log(data);
      this.getVideos();
    })
  }

  videoResults(id: number, video_file: any){
    this._service.getResultsByVideo(id).subscribe(data =>{
      console.log(data)
      this._router.navigate(['display', id, video_file])
    })

  }

}
