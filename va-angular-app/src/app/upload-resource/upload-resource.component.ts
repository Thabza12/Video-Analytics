import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { pickSheet } from '../pick-sheet';
import { pickSheetDetails } from '../pick-sheet-details';
import { pickSheetDetailsRequest } from '../pick-sheet-details-request';
import { uploadResource } from '../upload-resource';

@Component({
  selector: 'app-upload-resource',
  templateUrl: './upload-resource.component.html',
  styleUrls: ['./upload-resource.component.css']
})
export class uploadResourceComponent implements OnInit {

  uploadResourceForm = new UntypedFormGroup({});
  uploadResource: uploadResource = new uploadResource();
  pickSheetID!: number;
  pickSheet: pickSheet = new pickSheet();
  pickSheetDetails: pickSheetDetails = new pickSheetDetails();
  details: any;
  

  

  constructor(private _formBuilder: UntypedFormBuilder,
              private _service: appServiceService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uploadResourceForm = new UntypedFormGroup({
      'pickSheetNumber': new UntypedFormControl(),
      'shipmentNumber': new UntypedFormControl(),
      'pickSheetDate': new UntypedFormControl(),
      'deliveryDate': new UntypedFormControl(),
      'routeID': new UntypedFormControl(),
      'bay': new UntypedFormControl(),
      'bin': new UntypedFormControl(),
      'quantity': new UntypedFormControl(),
      'videoFile': new UntypedFormControl(),
      'recordDate': new UntypedFormControl(),
      'startTime': new UntypedFormControl(),
      'endTime': new UntypedFormControl(),
      'videoResultsRequest': new UntypedFormArray([
        this._formBuilder.group({
          'pickedProduct': new UntypedFormControl(''),
          'totalCases': new UntypedFormControl('')
        })
      ]),
      'pickSheetDetailsRequest': new UntypedFormArray([
        this._formBuilder.group({
          'zone': new UntypedFormControl(''),
          'pack': new UntypedFormControl(''),
          'flavour': new UntypedFormControl(''),
          'hands': new UntypedFormControl(''),
          'layers': new UntypedFormControl(''),
          'totalCases': new UntypedFormControl(''),
          'sku': new UntypedFormControl('')
        })
      ]),
      'algoResultsRequest': new UntypedFormArray([
        this._formBuilder.group({
          'productImage': new UntypedFormControl(''),
          'productName': new UntypedFormControl('')
        })
      ])

    })
  }

  get videoResultsRequest(): UntypedFormArray{
    return this.uploadResourceForm.controls['videoResultsRequest'] as UntypedFormArray;
  }

  addVideoResults(){
    let videoResultsArr = this.uploadResourceForm.get('videoResultsRequest') as UntypedFormArray;
    let newVideoResults = this._formBuilder.group({
      pickedProduct: [''],
      totalCases: ['']
    });

    videoResultsArr.push(newVideoResults);
  }

  get pickSheetDetailsRequest(): UntypedFormArray{
    return this.uploadResourceForm.controls["pickSheetDetailsRequest"] as UntypedFormArray;
  }

  addPickSheetDetails(){
    let pickSheetDetailsArr = this.uploadResourceForm.get('pickSheetDetailsRequest') as UntypedFormArray;
    let newPicksheetDetails = this._formBuilder.group({
      zone: [''],
      pack: [''],
      flavour: [''],
      hands: [''],
      layers: [''],
      totalCases: [''],
      sku: ['']
    });

    pickSheetDetailsArr.push(newPicksheetDetails);
  }

  get algoResultsRequest(): UntypedFormArray{
    return this.uploadResourceForm.controls['algoResultsRequest'] as UntypedFormArray
  }

  addAlgoResults(){
    let algoResultsArr = this.uploadResourceForm.get('algoResultsRequest') as UntypedFormArray;
    let newAlgoResults = this._formBuilder.group({
      productName: [''],
      productImage: ['']
    });

    algoResultsArr.push(newAlgoResults);
  }

  removePickSheetDetails(i: number){
    this.pickSheetDetailsRequest.removeAt(i)
  }

  removeVideoResults(i: number){
    this.videoResultsRequest.removeAt(i)
  }

  removeAlgoResults(i: number){
    this.algoResultsRequest.removeAt(i)
  }

  onSubmit(formValue: UntypedFormGroup){
    console.log("Uploading Resource");

    const postBody = {
      pickSheetNumber: formValue.value.pickSheetNumber,
      shipmentNumber: formValue.value.shipmentNumber,
      pickSheetDate: formValue.value.pickSheetDate,
      deliveryDate: formValue.value.deliveryDate,
      routeID: formValue.value.routeID,
      bay: formValue.value.bay,
      bin: formValue.value.bin,
      quantity: formValue.value.quantity,
      videoFile: formValue.value.videoFile,
      recordDate: formValue.value.recordDate,
      startTime: formValue.value.startTime,
      endTime: formValue.value.endTime,
      videoResultsRequest: formValue.value.videoResultsRequest,
      algoResultsRequest: formValue.value.algoResultsRequest,
      pickSheetDetailsRequest: formValue.value.pickSheetDetailsRequest
    }
    
    // this._service.uploadResource(postBody).subscribe(data =>{
    //   console.log(data);
    //   this.gotToViewPickSheet();
    // },
    // error => console.log(error));

  }

  gotToViewPickSheet(){
    this._router.navigate(['/pick-sheets']);
  }

}
