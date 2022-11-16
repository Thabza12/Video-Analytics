import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';
import { employee } from '../employee';

@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.css']
})
export class uploadEmployeeComponent implements OnInit {

  employee: employee = new employee();

  constructor(private _service: appServiceService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.employee);
    this._service.uploadEmployee(this.employee).subscribe();
    this.goToEmployees();
    
  }

  goToEmployees(){
    this._router.navigate(['employees']);
  }

}
