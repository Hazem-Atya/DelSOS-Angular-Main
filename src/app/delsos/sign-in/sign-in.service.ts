import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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


  public login(credentials) {
   
    return this.http.post<LoginDTO>(`${this.apiServerUrl}/auth/login`, credentials)
  }

  public getProfile(token: any) {
   /* const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    }) */
    return this.http.get<Shopper>(`${this.apiServerUrl}/auth/profile`)
  }
  
  public logout() {
    this.localStorageService.remove('token')
    this.router.navigateByUrl('/sign-in');
  }
  

  public isAuthenticated() {
    if (this.localStorageService.get('token') !== null ) return true 
    else return false
  }
}