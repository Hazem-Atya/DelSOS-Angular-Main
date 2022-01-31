import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Store } from '../DTO/store-register.dto';


@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  public sendRequest(store: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiServerUrl}/store/create-store`, store);
}

  
}
