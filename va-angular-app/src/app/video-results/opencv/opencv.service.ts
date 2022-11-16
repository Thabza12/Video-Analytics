import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { appServiceService } from 'src/app/app-service.service';
import { detectedObject } from 'src/app/detected-object';
import { productClass } from 'src/app/product-class';
import { videoResults } from 'src/app/video-results';

import { SPOpenCVLoadResult, SPOpenCVOptions } from './opencv.model';

declare var cv: any;

export const OPEN_CV_CONFIGURATION = new InjectionToken<SPOpenCVOptions>('Angular OpenCV Configuration Object');


@Injectable({
  providedIn: 'root'
})
export class OpencvService {

   //errorOutput: HTMLElement;
   src: any = null;
   dstC1 = null;
   dstC3 = null;
   dstC4 = null;
   videoResults: videoResults[] = [];
   detectedObject: detectedObject = new detectedObject();
   productClass: productClass = new productClass();

 
   stream: any;
   video: any;
   private isReady = new BehaviorSubject<SPOpenCVLoadResult>({
     ready: false,
     error: false,
     loading: true
   });
   isReady$: Observable<SPOpenCVLoadResult> = this.isReady.asObservable();
   OPENCV_URL = 'opencv.js';
   DEFAULT_OPTIONS = {
     scriptUrl: 'assets/opencv/asm/3.4/opencv.js',
     wasmBinaryFile: 'wasm/3.4/opencv_js.wasm',
     usingWasm: false,
     locateFile: this.locateFile.bind(this),
     onRuntimeInitialized: () => { }
   };
   onCameraStartedCallback!: (a: any, b: any) => void;
   constructor(private _service: appServiceService,
     @Inject(OPEN_CV_CONFIGURATION) options: SPOpenCVOptions) {
     console.log(options.scriptUrl);
     this.setScriptUrl(options.scriptUrl);
     const opts = { ...this.DEFAULT_OPTIONS, options };
     this.loadOpenCv(opts);
   }
   private locateFile(path: any, scriptDirectory: any): string {
     if (path === 'opencv_js.wasm') {
       return scriptDirectory + '/wasm/' + path;
     } else {
       return scriptDirectory + path;
     }
   }
   setScriptUrl(url: string) {
     this.OPENCV_URL = url;
   }
 
   onVideoCanPlay() {
     if (this.onCameraStartedCallback) {
       this.onCameraStartedCallback(this.stream, this.video);
     }
   }
 
   grayScaleFrame(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
     let src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
     let dst = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC1);
     let cap = new cv.VideoCapture(video);
     cap.read(src);
     console.log(src);
     cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
     cv.imshow(canvas, dst);
   }

   processFrame(video: HTMLVideoElement, canvas: HTMLCanvasElement, metadata: any){
    let src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
    let dst = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture(video);
    cap.read(src);
    console.log(src);
    src.copyTo(dst);
    this.drawBoundingBoxes(src, dst, metadata.presentedFrames, canvas.height, canvas.width)
    cv.imshow(canvas, dst);
   }
 
   playVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
     let src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
     let dst = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC1);
     let cap = new cv.VideoCapture(video);
     
     const FPS = 30;
     function processVideo(){
       let begin = Date.now();
       cap.read(src);
       cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
       cv.imshow(canvas, dst);
       let delay = 1000/FPS - (Date.now() - begin);
       setTimeout(processVideo, delay);
     }
     setTimeout(processVideo, 0);
   }
 
   startCamera(video: HTMLVideoElement) {
     console.log("video " + video)
     const constraints = {
       qvga: { width: { exact: 320 }, height: { exact: 240 } },
       vga: { width: { exact: 640 }, height: { exact: 480 } }
     };
 
     let resolution = {
       audio: false,
       video: { width: 1280, height: 720 }
     }
     navigator.mediaDevices.getUserMedia(resolution)
       .then((stream) => {
         video.srcObject = stream;
         this.video = video;
         this.stream = stream;
         video.play();
       })
       .catch(function (err) {
         console.log("An error occurred! " + err);
       });
   }
 
   stopCamera() {
     if (this.video) {
       this.video.pause();
       this.video.srcObject = null;
       this.video.removeEventListener('canplay', this.onVideoCanPlay.bind(this));
     }
     if (this.stream) {
       this.stream.getVideoTracks()[0].stop();
     }
   }
 
   loadImageToHTMLCanvas(imageUrl: string, canvas: HTMLCanvasElement): Observable<any> {
     console.log(imageUrl);
     return new Observable((observer: Observer<object>) => {
       const ctx = canvas.getContext('2d');
       const img = new Image();
       img.crossOrigin = 'anonymous';
       img.onload = () => {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx?.drawImage(img, 0, 0, img.width, img.height);
         observer.next(observer);
       };
       console.log("before image")
       img.src = imageUrl;
     });
   }
 
   loadOpenCv(options: SPOpenCVOptions) {
     this.isReady.next({
       ready: false,
       error: false,
       loading: true
     });
     //window['Module'] = { ...options };
     const script = document.createElement('script');
     script.setAttribute('async', '');
     script.setAttribute('type', 'text/javascript');
     script.addEventListener('load', () => {
       const onRuntimeInitializedCallback = () => {
         if (options.onRuntimeInitialized) {
           options.onRuntimeInitialized();
         }
         this.isReady.next({
           ready: true,
           error: false,
           loading: false
         });
       };
       cv.onRuntimeInitialized = onRuntimeInitializedCallback;
     });
     script.addEventListener('error', () => {
       const err = this.printError('Failed to load ' + this.OPENCV_URL);
       this.isReady.next({
         ready: false,
         error: true,
         loading: false
       });
       this.isReady.error(err);
     });
     script.src = this.OPENCV_URL;
     const node = document.getElementsByTagName('script')[0];
     if (node) {
       node.parentNode?.insertBefore(script, node);
     } else {
       document.head.appendChild(script);
     }
   }
 
   printError(err: any) {
     if (typeof err === 'undefined') {
       err = '';
     } else if (typeof err === 'number') {
       if (!isNaN(err)) {
         if (typeof cv !== 'undefined') {
           err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
         }
       }
     } else if (typeof err === 'string') {
       const ptr = Number(err.split(' ')[0]);
       if (!isNaN(ptr)) {
         if (typeof cv !== 'undefined') {
           err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
         }
       }
     } else if (err instanceof Error) {
       err = err?.stack?.replace(/\n/g, '<br>');
     }
     throw new Error(err);
   }

   

  drawBoundingBoxes(src: any, dst: any, frameId: number, height: number, width: number) {

    let BboxData: any = sessionStorage.getItem("Bboxes");

    let detected: any = sessionStorage.getItem("detectedObjects")

    let pClass: any = sessionStorage.getItem("classes")

    let productClasses = JSON.parse(pClass);

    let resultBboxes = JSON.parse(BboxData);

    let detectedObjects = JSON.parse(detected);

    // console.log(resultBboxes);

    // console.log(detectedObjects);

    // console.log(productClasses);

    let identifiedBboxes: videoResults = new videoResults();

    for (let Bboxes = 0; Bboxes < resultBboxes.length; Bboxes++) {
      if (frameId == resultBboxes[Bboxes].frame_id) {
        identifiedBboxes = resultBboxes[Bboxes];

        for (let object = 0; object < detectedObjects.length; object++) {
          if (identifiedBboxes.id == detectedObjects[object].bounding_box_id) {
            this.detectedObject = detectedObjects[object];

            for (let index = 0; index < productClasses.length; index++) {
              if (this.detectedObject.class_id == productClasses[index].id) {
                this.productClass = productClasses[index];

              }
              
            }
            
          }
          
        }

        const w = identifiedBboxes.width * width;
        const h = identifiedBboxes.height * height;
        const x = identifiedBboxes.x_coordinate * width;
        const y = identifiedBboxes.y_coordinate * height;
        const x2 = x+w;
        const y2 = y+h;
        cv.rectangle(dst, new cv.Point(x, y), new cv.Point(x2, y2), [0, 12, 255, 255], 2);
        cv.putText(dst, (this.productClass.product_name), new cv.Point(x, y), cv.FONT_HERSHEY_SIMPLEX, 0.5, [180, 180, 255, 255], 1)
        cv.putText(dst, (this.detectedObject.probability.toString()), new cv.Point(x+5, y+5), cv.FONT_HERSHEY_SIMPLEX, 0.5, [255, 255, 0, 255], 1)
        cv.putText(dst, (this.detectedObject.algorithm_name.toString()), new cv.Point(x+20, y+20), cv.FONT_HERSHEY_SIMPLEX, 0.5, [18, 80, 40, 255], 1)
        
      } 
        
  
    }
          
  }

   

}
