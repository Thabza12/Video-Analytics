import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SPOpenCVLoadResult } from '../opencv/opencv.model';
import { OpencvService } from '../opencv/opencv.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class playerComponent implements OnInit {

  openCVLoadResult: Observable<SPOpenCVLoadResult>;

  @ViewChild('videoCanvas')
  videoCanvas!: ElementRef;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  @ViewChild('canvasOutput')
  canvasOutput!: ElementRef;
  video_file!: any;

  constructor(private spOpencvService: OpencvService,
    private _route: ActivatedRoute) {
    this.openCVLoadResult = this.spOpencvService.isReady$;
  }

  ngOnInit(): void {
    this.video_file = this._route.snapshot.params['video_file'];
  }
  ngAfterViewInit() {
    console.log("in const" + this.videoCanvas);
    //this.spOpencvService.startCamera(this.videoCanvas.nativeElement);
    //this.spOpencvService.playVideo(this.videoCanvas.nativeElement, this.canvasOutput.nativeElement);
    this.videoCanvas.nativeElement.addEventListener('play', (event: Event) => {
      console.log('The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.' + event);
      //this.spOpencvService.playVideo(this.videoCanvas.nativeElement, this.canvasOutput.nativeElement);
    });


    const updateCanvas = (now: any, metadata:any) => {
      console.log(now, metadata);
      console.log("Frame ID is " + metadata.presentedFrames);
      // do {
      //   this.spOpencvService.processFrame(this.videoCanvas.nativeElement, this.canvasOutput.nativeElement, metadata);
      // } while (metadata.presentedFrames <= metadata.presentedFrames);
      this.spOpencvService.processFrame(this.videoCanvas.nativeElement, this.canvasOutput.nativeElement, metadata);
      this.videoCanvas.nativeElement.requestVideoFrameCallback(updateCanvas);
    };

    this.videoCanvas.nativeElement.requestVideoFrameCallback(updateCanvas);
  }

  stopCamera() {
    console.log("stop camera");
    //this.spOpencvService.stopCamera();
    this.spOpencvService.playVideo(this.videoCanvas.nativeElement, this.canvasOutput.nativeElement);
  }

  loadVideo(event: Event) {
    const target = event.target as HTMLInputElement;

    console.log(target.files);

    //this.spOpencvService.playVideo("S1.MOV", this.canvasOutput.nativeElement);

    if (target.files?.length) {
      console.log(target.files[0].type);
      // const reader = new FileReader();
      // const load$ = fromEvent(reader, 'load');
      // // load$.subscribe(
      // //   console.log,
      // //   console.error,
      // //   () => console.log('completed httpResult$')
      // // );
      // load$.pipe(map(item => this.spOpencvService.playVideo(`${reader.result}`, this.canvasOutput.nativeElement) )).subscribe();
      // console.log("before read" + target.files[0])
      // reader.readAsDataURL(target.files[0]);
      // //console.log(load$);

      // //load$.pipe(
      //   //this.spOpencvService.playVideo(`${reader.result}`, this.canvasOutput.nativeElement)
      // //)
    }

  }

}
