import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shopper } from '../../model/Shopper';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  public getShoppers(): Observable<Shopper[]> {
    return this.http.get<Shopper[]>(`${this.apiServerUrl}/shopper/all`);
  }

  public addShopper(shopper: Shopper): Observable<Shopper> {
    return this.http.post<Shopper>(`${this.apiServerUrl}/shopper/register`, shopper);
  }

  public updateShopper(shopper: Shopper): Observable<Shopper> {
    return this.http.put<Shopper>(`${this.apiServerUrl}/user/update`, shopper);
  }
  public deleteShopper(shopperId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${shopperId}`);
  }
  
}
