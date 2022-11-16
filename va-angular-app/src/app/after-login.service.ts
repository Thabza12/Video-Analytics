import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { appServiceService } from './app-service.service';

@Injectable({
  providedIn: 'root'
})
export class afterLoginService implements CanActivate {

  constructor(private _service: appServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._service.loggedIn();
  }
}
