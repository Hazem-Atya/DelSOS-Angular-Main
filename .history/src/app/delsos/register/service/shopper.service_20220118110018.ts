import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shopper } from '../../model/Shopper';

@Injectable({
  providedIn: 'root'
})
export class ShopperService {

  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  public getShoppers(): Observable<Shopper[]> {
    return this.http.get<Shopper[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addShopper(shopper: Shopper): Observable<Shopper> {
    return this.http.post<Shopper>(`${this.apiServerUrl}/user/create-shopper`, shopper);
  }

  public updateShopper(shopper: Shopper): Observable<Shopper> {
    return this.http.put<Shopper>(`${this.apiServerUrl}/user/update`, shopper);
  }
  public deleteShopper(shopperId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${shopperId}`);
  }
  public login(email: string, password: string) {
    return this.
  }
}
