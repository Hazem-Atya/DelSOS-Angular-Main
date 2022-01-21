import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'environments/constants';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shopper } from '../register/DTO/shopper-register.dto';
import { LoginDTO } from './DTO/login.dto';
import { LocalStorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})

export class SigninService{
  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient, private localStorageService :LocalStorageService,private router: Router,) {
  }


  public login(credentials): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${this.apiServerUrl}/auth/login`, credentials)
  }

  public getProfile(token: any): Observable<Shopper> {
    return this.http.get<Shopper>(`${this.apiServerUrl}/auth/profile`)
  }
  
  public logout() {
    this.localStorageService.remove('token')
    this.router.navigateByUrl('/sign-in');
  }
  
  public isShopper() {
  
      if (this.localStorageService.get('role') == Role.shopper) {
        return true
      }
      return false
    
 
  }
  public isAuthenticated() {
    if (this.localStorageService.get('token') !== null ) return true 
    else return false
  }
}