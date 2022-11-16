import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SPOpenCVLoadResult } from '../opencv/opencv.model';
import { OpencvService } from '../opencv/opencv.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.css']
})
export class canvasViewComponent implements OnInit {

  openCVLoadResult: Observable<SPOpenCVLoadResult>;
  
  // HTML Element references
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  @ViewChild('canvasOutput')
  canvasOutput!: ElementRef;
  id!: number;

  constructor(private spOpencvService: OpencvService,
              private _route: ActivatedRoute) {
    this.openCVLoadResult = this.spOpencvService.isReady$;
   }

  ngOnInit(): void {
    //this.openCVLoadResult = this.spOpencvService.isReady$;
    this.id = this._route.snapshot.params['id'];
  }


  
  loadImage(event: Event) {
    const target = event.target as HTMLInputElement;

    console.log(target.files);

    if (target.files?.length) {
      const reader = new FileReader();
      const load$ = fromEvent(reader, 'load');
      load$
        .pipe(
          switchMap(() => {
            return this.spOpencvService.loadImageToHTMLCanvas(`${reader.result}`, this.canvasOutput.nativeElement);
          })
        )
        .subscribe(
          () => {},
          err => {
            console.log('Error loading image', err);
          }
        );
      reader.readAsDataURL(target.files[0]);
    }
  
  }
  myFunc(){
    console.log("function called");
    // this.spOpencvService.drawBoundingBoxes(this.canvasOutput.nativeElement, this.id);
  }

}
