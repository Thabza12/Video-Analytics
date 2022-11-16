import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-response-rest',
  templateUrl: './response-rest.component.html',
  styleUrls: ['./response-rest.component.css']
})
export class responseRestComponent implements OnInit {

  public form ={
    email:null,
    resetToken:null,
    password:null,
    password_confirmation:null
  };

  constructor(private _route: ActivatedRoute,
              private _service: appServiceService,
              private _router: Router) {
    _route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this._service.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )

  }

  handleResponse(data: any){
    this._router.navigate(['/login']);
  }

  handleError(error: any){

  }

}
