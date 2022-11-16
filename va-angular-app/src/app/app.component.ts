import { Component, OnInit } from '@angular/core';
import { appServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'va-frontend';

  public loggedIn: boolean = false;

  constructor(private _service: appServiceService) { }

  ngOnInit(): void {
    this._service.authStatus.subscribe(value =>
      this.loggedIn = value);
  }


}
