import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent implements OnInit {

  public form ={
    email:null,
    name:null,
    password:null,
    password_confirmation:null
  };

  public error = [];

  constructor(private _service: appServiceService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._service.register(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );

  }

  handleResponse(data: any){
    this._service.handleToken(data.access_token);
    this._router.navigate(['/profile']);
  }

  handleError(error:any){
    this.error = error.error.errors;
  }

}
