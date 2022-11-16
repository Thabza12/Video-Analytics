import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class employeesComponent implements OnInit {

  employee:any

  constructor(private _service: appServiceService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this._service.getAllEmployees().subscribe(data => {
      this.employee = data;
    });
  }

  updateEmployee(id: number){
    this._service.getEmployeeById(id).subscribe(data =>{
      this.employee = data
    });
    this._router.navigate(['update-employee', id]);
    this._service.updateEmployee(id, this.employee);
  }

  deleteEmployee(id: number){
    this._service.deleteEmployeeById(id).subscribe(data =>{
      console.log(data);
      this.getEmployees();
    })
  }



}
