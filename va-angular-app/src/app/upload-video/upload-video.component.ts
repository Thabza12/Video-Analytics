import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class uploadVideoComponent implements OnInit {

  uploadVideosForm = new UntypedFormGroup({});

  constructor(private _formBuilder: UntypedFormBuilder,
              private _service: appServiceService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.uploadVideosForm = new UntypedFormGroup({
      'video_file': new UntypedFormControl(),
      'record_date': new UntypedFormControl(),
      'start_time': new UntypedFormControl(),
      'end_time': new UntypedFormControl(),
      // 'videoResultsRequest': new UntypedFormArray([
      //   this._formBuilder.group({
      //     'pickedProduct': new UntypedFormControl(''),
      //     'totalCases': new UntypedFormControl('')
      //   })
      // ]),
      // 'algoResultsRequest': new UntypedFormArray([
      //   this._formBuilder.group({
      //     'productImage': new UntypedFormControl(''),
      //     'productName': new UntypedFormControl('')
      //   })
      // ])

    })

  }

  // get videoResultsRequest(): UntypedFormArray{
  //   return this.uploadVideosForm.controls['videoResultsRequest'] as UntypedFormArray;
  // }

  // addVideoResults(){
  //   let videoResultsArr = this.uploadVideosForm.get('videoResultsRequest') as UntypedFormArray;
  //   let newVideoResults = this._formBuilder.group({
  //     pickedProduct: [''],
  //     totalCases: ['']
  //   });

  //   videoResultsArr.push(newVideoResults);
  // }

  // get algoResultsRequest(): UntypedFormArray{
  //   return this.uploadVideosForm.controls['algoResultsRequest'] as UntypedFormArray
  // }

  // addAlgoResults(){
  //   let algoResultsArr = this.uploadVideosForm.get('algoResultsRequest') as UntypedFormArray;
  //   let newAlgoResults = this._formBuilder.group({
  //     productName: [''],
  //     productImage: ['']
  //   });

  //   algoResultsArr.push(newAlgoResults);
  // }

  // removeVideoResults(i: number){
  //   this.videoResultsRequest.removeAt(i)
  // }

  // removeAlgoResults(i: number){
  //   this.algoResultsRequest.removeAt(i)
  // }

  onSubmit(formValue: UntypedFormGroup){

    const postBody = {
      video_file: formValue.value.video_file,
      record_date: formValue.value.record_date,
      start_time: formValue.value.start_time,
      end_time: formValue.value.end_time,
      // videoResultsRequest: formValue.value.videoResultsRequest,
      // algoResultsRequest: formValue.value.algoResultsRequest
    }
    
    this._service.uploadVideo(postBody).subscribe(data =>{
      console.log(data);
      this.gotToViewVideos();
    },
    error => console.log(error));

  }

  gotToViewVideos(){
    this._router.navigate(['/videos']);
  }

}
