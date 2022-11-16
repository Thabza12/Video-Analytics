import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from 'src/app/app-service.service';
import { detectedObject } from 'src/app/detected-object';
import { productClass } from 'src/app/product-class';
import { videoResults } from 'src/app/video-results';

@Component({
  selector: 'app-view-video-results',
  templateUrl: './view-video-results.component.html',
  styleUrls: ['./view-video-results.component.css']
})
export class viewVideoResultsComponent implements OnInit {

  videoResults: videoResults[] = []; 

  detectedObjects: detectedObject[] = []; 
  productClasses: productClass[] = [];
  id!: number;
  totalRecords!: any;
  page: number=1; 


  constructor(private _service: appServiceService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this._service.getResultsByVideo(this.id).subscribe(data =>{
      this.videoResults = data;
      this.getBboxes(data);
      this.getDetectedObjects();
      this.getProductClasses();
      this.getBboxSessionData();
      this.getDetectedObjectSessionData();
      this.getProductClassSessionData();
      this.totalRecords = data.length
    }, error => console.log(error));
  }

  getBboxes(data: any){
    let sessionResults: videoResults = new videoResults();
      for (let results = 0; results < this.videoResults.length; results++) {
        if (this.id == this.videoResults[results].video_id) {
          sessionResults = this.videoResults[results];
          this.setSession(data);          
        }
        
      }

  }

  getDetectedObjects(){
    this._service.getDetected().subscribe(data =>{
      this.detectedObjects = data
      this.setDetectedObjectSession(this.detectedObjects);      
    })
  }

  getProductClasses(){
    this._service.getProductClasses().subscribe(data =>{
      this.productClasses = data;
      this.setProductClassSession(this.productClasses);
    })
  }



  setDetectedObjectSession(detected: any){
    sessionStorage.setItem("detectedObjects", JSON.stringify(detected))
  }

  setProductClassSession(productClass: any){
    sessionStorage.setItem("classes", JSON.stringify(productClass))
  }

  setSession(sessionData: any){
    sessionStorage.setItem("Bboxes", JSON.stringify(sessionData))
  }

  getBboxSessionData(){
    let BboxData: any = sessionStorage.getItem("Bboxes");
    let resultBboxes = JSON.parse(BboxData);
    console.log(resultBboxes);
  }

  getDetectedObjectSessionData(){
    let detected: any = sessionStorage.getItem("detectedObjects");
    let detectedObjects = JSON.parse(detected);
    console.log(detectedObjects);
  }

  getProductClassSessionData(){
    let pClass: any = sessionStorage.getItem("classes")
    let productClasses = JSON.parse(pClass);
    console.log(productClasses);
  }
  

  openDialog(id: number){
    
  }

}
