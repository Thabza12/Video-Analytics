import { Time } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { video } from '../video';

export interface DailogData{
  id: number;
  video_file: string;
  record_date: Date;
  start_time: Time;
  end_time: Time
}

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css']
})
export class updateVideoComponent implements OnInit {

  updateVideoForm = new UntypedFormGroup({});
  video: video = new video();
  id!: number;

  constructor(private _service: appServiceService,
              private _router: Router,
              private _fb: FormBuilder,
              private _route: ActivatedRoute,
              public dialogRef: MatDialogRef<updateVideoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DailogData) { }

  ngOnInit(): void {

    this.dialogRef.disableClose = true;

    this.updateVideoForm = this._fb.group({
      'video_file': new UntypedFormControl(this.data.video_file),
      'record_date': new UntypedFormControl(this.data.record_date),
      'start_time': new UntypedFormControl(this.data.start_time),
      'end_time': new UntypedFormControl(this.data.end_time)

    });

    
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){

    this._service.updateVideo(this.data.id, this.updateVideoForm.value).subscribe(data =>{
      console.log("updated successful", data); 
      this.dialogRef.close(data);
      this._service.filter("updating")
    },
    error => console.log(error));
    console.log("Closing modal box");
    
  }


  gotToViewVideos(){
    this._router.navigate(['/videos']);
  }

}
