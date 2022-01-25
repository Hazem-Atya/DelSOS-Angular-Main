import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'environments/constants';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shopper } from '../register/DTO/shopper-register.dto';
import { Store } from '../store-register/DTO/store-register.dto';
import { LoginDTO } from './DTO/login.dto';
import { LocalStorageService } from './localstorage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SigninService {
  private apiServerUrl = environment.apiURL;
  private shopperSubject: BehaviorSubject<Shopper>;
  public user: Observable<Shopper>;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router,) {
    this.shopperSubject = new BehaviorSubject<Shopper>(JSON.parse(localStorage.getItem('user')));
    this.user = this.shopperSubject.asObservable();
  }


  public login(credentials): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${this.apiServerUrl}/auth/login`, credentials)
      .pipe(map(login => {
      localStorage.setItem('token', login.access_token);
      
      return login;
    }));

  }

  public getProfile(): Observable<Shopper> {
    return this.http.get<Shopper>(`${this.apiServerUrl}/auth/profile`)
    .pipe(map(user => {
      this.localStorageService.set('role', user.role);
      this.localStorageService.set('user', JSON.stringify(user));
      this.shopperSubject.next(user);
      return user;
    }));
  }

  public logout() {
    this.localStorageService.remove('role')
    this.localStorageService.remove('token')
    this.shopperSubject.next(null);
    this.router.navigateByUrl('/sign-in');
  }

  public isShopper() {

    if (this.localStorageService.get('role') == Role.shopper) {
      return true
    }
    return false


  }
  public isAuthenticated() {
    if (this.localStorageService.get('token') !== null) return true
    else return false
  }
}