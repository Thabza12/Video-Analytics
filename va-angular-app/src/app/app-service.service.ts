import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { algoResults } from './algo-results';
import { detectedObject } from './detected-object';
import { employee } from './employee';
import { pickSheet } from './pick-sheet';
import { pickSheetDetails } from './pick-sheet-details';
import { pickSheetResource } from './pick-sheet-resource';
import { productClass } from './product-class';
import { video } from './video';
import { videoResults } from './video-results';


@Injectable({
  providedIn: 'root'
})
export class appServiceService {

  private baseUrl = 'http://localhost:8081/api/v1';
  private url = 'http://localhost/api';
  private loginUrl = 'http://localhost/api/login';
  private registerUrl = 'http://localhost/api/register';
  private iss = {
    login: 'http://localhost/api/login',
    register: 'http://localhost/api/register'
  };
  private resetPassword = 'http://localhost/api/resetPassword';
  private newPassword = 'http://localhost/api/newPassword';
  isAuthenticated = false;

  private signedIn = new BehaviorSubject<boolean>(this.loggedIn());
  authStatus = this.signedIn.asObservable();


  constructor(private _http: HttpClient) { }

  //spring-boot 
    
  // viewPickSheets(): Observable<pickSheet[]> {
  //   return this._http.get<pickSheet[]>(`${this.baseUrl}/pickSheets`);
  // }

  // viewPickSheetDetails(): Observable<pickSheetDetails[]> {
  //   return this._http.get<pickSheetDetails[]>(`${this.baseUrl}/pickSheetDetails`)
  // }

  // viewVideos(): Observable<video[]> {
  //   return this._http.get<video[]>(`${this.baseUrl}/videos`)
  // }

  // viewVideoResults(): Observable<videoResults[]> {
  //   return this._http.get<videoResults[]>(`${this.baseUrl}/videoResults`)
  // }

  // viewAlgoResults(): Observable<algoResults[]> {
  //   return this._http.get<algoResults[]>(`${this.baseUrl}/algoResults`)
  // }

  // updatePicksheets(pickSheetID: number, pickSheet: pickSheet): Observable<Object> {
  //   return this._http.put(`${this.baseUrl}/pickSheet/${pickSheetID}`, pickSheet)
  // }

  // updatePicksheetDetails(id: number, pickSheetDetails: pickSheetDetails): Observable<Object> {
  //   return this._http.put(`${this.baseUrl}/pickSheetDetails/${id}`, pickSheetDetails)
  // }

  // updateVideo(id: number, video: video): Observable<Object> {
  //   return this._http.put(`${this.baseUrl}/videos/${id}`, video)
  // }

  // updateVideoResults(id: number, videoResult: videoResults): Observable<Object> {
  //   return this._http.put(`${this.baseUrl}/videoResults/${id}`, videoResult)
  // }

  // updateAlgoResults(id: number, algoResult: algoResults): Observable<Object> {
  //   return this._http.put(`${this.baseUrl}/algoResults/${id}`, algoResult)
  // }

  // getPickSheetById(pickSheetID: number): Observable<pickSheet> {
  //   return this._http.get<pickSheet>(`${this.baseUrl}/pickSheet/${pickSheetID}`)
  // }

  // getPickSheetDetailsByPickSheet(pickSheetID: number): Observable<pickSheetDetails[]> {
  //   return this._http.get<pickSheetDetails[]>(`${this.baseUrl}/pickSheetDetailsByPickSheet/${pickSheetID}`)
  // }

  // getVideoResultsById(id: number): Observable<videoResults> {
  //   return this._http.get<videoResults>(`${this.baseUrl}/videoResults/${id}`)
  // }

  // getAlgoResultsById(id: number): Observable<algoResults> {
  //   return this._http.get<algoResults>(`${this.baseUrl}/algoResults/${id}`)
  // }

  // getVideosById(id: number): Observable<video> {
  //   return this._http.get<video>(`${this.baseUrl}/videos/${id}`)
  // }

  // deleteAlgoResutls(id: number): Observable<Object> {
  //   return this._http.delete(`${this.baseUrl}/algoResults/${id}`)
  // }

  // deleteVideo(id: number): Observable<Object> {
  //   return this._http.delete(`${this.baseUrl}/videos/${id}`)
  // }

  // deleteVideoResults(id: number): Observable<Object> {
  //   return this._http.delete(`${this.baseUrl}/videoResults/${id}`)
  // }

  // deletePickSheet(pickSheetID: number): Observable<Object> {
  //   return this._http.delete(`${this.baseUrl}/pickSheet/${pickSheetID}`)
  // }

  // deletePickSheetDetails(id: number): Observable<Object> {
  //   return this._http.delete(`${this.baseUrl}/pickSheetDetails/${id}`)
  // }

  // findPickSheetDetailsByPickSheet(pickSheetID: number): Observable<Object>{
  //   return this._http.get<Object>(`${this.baseUrl}/pickSheetDetailsByPickSheet/${pickSheetID}`)
  // }

  // findPickSheetByVideo(id: any): Observable<Object>{
  //   return this._http.get<Object>(`${this.baseUrl}/pickSheetByVideo/${id}`)
  // }

  // uploadResource(body: any): Observable<Object> {
  //   return this._http.post<Object>(`${this.baseUrl}/uploadVideo`, body)
  // }

  // uploadVideosResource(body: any): Observable<Object>{
  //   return this._http.post<Object>(`${this.baseUrl}/saveVideo`, body)
  // }

  // uploadPickSheetResource(body: any): Observable<Object>{
  //   return this._http.post<Object>(`${this.baseUrl}/savePickSheet`, body)
  // }

  // unassignedPickSheets(): Observable<pickSheet[]>{
  //   return this._http.get<pickSheet[]>(`${this.baseUrl}/unassigned/pickSheets`)
  // }

  // assignVideo(pickSheetID: number, id: number){
  //   return this._http.post(`${this.baseUrl}/assign/pickSheet/${pickSheetID}/video/${id}`, null).subscribe(
  //     (val) => {
  //         console.log("POST call successful value returned in body", val);
  //     },
  //     response => {
  //         console.log("POST call in error", response);
  //     },
  //     () => {
  //         console.log("The POST observable is now completed.");
  //     });
  // }

  //laravel-employee

  getAllEmployees(){
    return this._http.get(`${this.url}/employees`);
  }

  getEmployeeById(id: number){
    return this._http.get(`${this.url}/employee/${id}`);
  }

  uploadEmployee(employee: employee){
    return this._http.post(`${this.url}/addEmployee`, employee);
  }

  deleteEmployeeById(id: number){
    return this._http.delete(`${this.url}/deleteEmployee/${id}`);
  }

  updateEmployee(id: number, employee: employee){
    return this._http.put(`${this.url}/updateEmployee/${id}`, employee);
  }

  getVideos(): Observable<video[]>{
    return this._http.get<video[]>(`${this.url}/videos`);
  }

  getPickSheets(): Observable<pickSheet[]>{
    return this._http.get<pickSheet[]>(`${this.url}/pickSheets`);
  }

  getUnassignedPickSheets(): Observable<pickSheet[]>{
    return this._http.get<pickSheet[]>(`${this.url}/unassigned`)
  }

  getDetailsByPickSheet(id: number): Observable<pickSheetDetails[]>{
    return this._http.get<pickSheetDetails[]>(`${this.url}/detailsByPickSheet/${id}`)
  }

  getBboxesByFrame(id: number): Observable<videoResults[]>{
    return this._http.get<videoResults[]>(`${this.url}/boundingBoxByFrame/${id}`)
  }

  getResultsByVideo(id: any): Observable<videoResults[]>{
    return this._http.get<videoResults[]>(`${this.url}/boundingBoxByVideo/${id}`)
  }

  getDetectedByBbox(id: any): Observable<detectedObject[]>{
    return this._http.get<detectedObject[]>(`${this.url}/detectedByBbox/${id}`)
  }

  getDetected(): Observable<detectedObject[]>{
    return this._http.get<detectedObject[]>(`${this.url}/detected`)
  }

  getProductClass(id: number): Observable<productClass[]>{
    return this._http.get<productClass[]>(`${this.url}/class/${id}`)
  }

  getProductClasses(): Observable<productClass[]>{
    return this._http.get<productClass[]>(`${this.url}/classes`)
  }

  getDetails(): Observable<pickSheetDetails[]>{
    return this._http.get<pickSheetDetails[]>(`${this.url}/pickSheetDetails`);
  }

  updateVideo(id: number, video: video): Observable<Object> {
    return this._http.put(`${this.url}/updateVideo/${id}`, video)
  }

  updatePicksheets(id: number, pickSheet: pickSheet): Observable<Object> {
    return this._http.put(`${this.url}/updatePickSheet/${id}`, pickSheet)
  }

  updatePicksheetDetails(id: number, pickSheetDetails: pickSheetDetails): Observable<Object> {
    return this._http.put(`${this.url}/updatePickSheetDetails/${id}`, pickSheetDetails)
  }

  deletePickSheet(id: number): Observable<Object> {
    return this._http.delete(`${this.url}/deletePickSheet/${id}`)
  }

  deleteVideo(id: number): Observable<Object> {
    return this._http.delete(`${this.url}/deleteVideo/${id}`)
  }

  uploadVideo(video: any){
    return this._http.post(`${this.url}/addVideo`, video);
  }

  uploadPickSheetResource(pickSheetResource: any){
    return this._http.post(`${this.url}/addPickSheet`, pickSheetResource);
  }

  assignVideo(pickSheetID: number, id: number){
    return this._http.put(`${this.url}/assign/${id}/pickSheet/${pickSheetID}`, null).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  private listners = new Subject<any>();
  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: any){
    this.listners.next(filterBy);
  }



  //laravel-login, register, token handler & auth

  login(data: any){
    return this._http.post(`${this.loginUrl}`, data);
  }

  register(data: any){
    return this._http.post(`${this.registerUrl}`, data);
  }

  handleToken(token: any){
    this.set(token);
    // console.log(this.isValid());
  }

  set(token: any){
    localStorage.setItem('token', token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }

    return false;

  }

  payload(token: any){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any){
    return JSON.parse(atob(payload));

  }

  loggedIn(){
    return this.isValid();
  }

  changeAuthStatus(value: boolean){
    this.signedIn.next(value)
  }


  //reset password

  passwordReset(data: any){
    return this._http.post(`${this.resetPassword}`, data);
  }

  changePassword(data: any){
    return this._http.post(`${this.newPassword}`, data);
  }



  
}
