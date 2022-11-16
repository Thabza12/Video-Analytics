import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-update-video-results',
  templateUrl: './update-video-results.component.html',
  styleUrls: ['./update-video-results.component.css']
})
export class updateVideoResultsComponent implements OnInit {

  id!: number;

  constructor(private _service: appServiceService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.id = this._route.snapshot.params['id'];
    // this._service.getVideoResultsById(this.id).subscribe(data =>{
    //   this.videoResult = data;
    // }, error => console.log(error));
  }

  // onSubmit(){
  //   this._service.getVideoResultsById(this.id);
  //   this._service.updateVideoResults(this.id, this.videoResult).subscribe(data =>{
      
  //     this.gotToViewVideoResults();
  //   },
  //   error => console.log(error));
    
    
  // }


  // gotToViewVideoResults(){
  //   this._router.navigate(['/video-results']);
  // }

}
