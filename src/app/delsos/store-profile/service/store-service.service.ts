import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Delivery } from 'app/delsos/model/delivery';
import { Store } from 'app/delsos/model/Store';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StoreProfileService{

    private apiServerUrl = environment.apiURL;

    constructor(private http: HttpClient) {
    }


    public getStore(): Observable<Store> {
        return this.http.get<Store>(`${this.apiServerUrl}/auth/profile`);   
    }

    
    public updateStore(updatedStore): Observable<Store> {
        return this.http.post<Store>(`${this.apiServerUrl}/store/update`,updatedStore);   
    }

    public updatePassword(newPasswordData): Observable<Store> {
        return this.http.post<Store>(`${this.apiServerUrl}/store/update-password`,newPasswordData);   
    }

    public createDelivery(createDelivery): Observable<Delivery> {
        return this.http.post<Delivery>(`${this.apiServerUrl}/delivery`,createDelivery);   
    }

    public getDeliveries():Observable<Delivery[]> {
        return this.http.get<Delivery[]>(`${this.apiServerUrl}/delivery/all`);
    }

}
