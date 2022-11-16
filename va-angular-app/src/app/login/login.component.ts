import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(private _service: appServiceService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._service.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  }

  handleResponse(data: any){
    this._service.handleToken(data.access_token);
    this._service.changeAuthStatus(true);
    this._router.navigate(['/videos']);
  }

  handleError(error:any){
    this.error = error.error.error;
  }

}
