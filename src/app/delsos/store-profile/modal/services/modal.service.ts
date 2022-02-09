import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shopper } from 'app/delsos/model/Shopper';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  getShopper(id): Observable<Shopper> {
    return this.http.get<Shopper>(`${this.apiServerUrl}/shopper/${id}`);   
  }

  chooseShopper(deliveryId,shopperEmail): Observable<any> {
    return this.http.patch<any>(`${this.apiServerUrl}/delivery/affect-shopper`,{deliveryId,shopperEmail});   
  }
}
