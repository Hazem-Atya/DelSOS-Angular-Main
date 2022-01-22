import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SignInComponent } from "app/delsos/sign-in/sign-in.component";
import { SigninService } from "app/delsos/sign-in/sign-in.service";
import { Observable } from "rxjs";


@Injectable({
  providedIn : 'root'
})
export class SigninGuard implements CanActivate{
  
  constructor(
    private signinService: SigninService, 
    private router :Router, 
  ) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.signinService.isAuthenticated()) {
      this.router.navigate(['sign-in'])
      return false
    }
    return true
  }

}


