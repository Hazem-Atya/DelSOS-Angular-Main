import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from 'app/delsos/model/delivery';
import { Store } from 'app/delsos/model/Store';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DeliveriesCatalogService{

    private apiServerUrl = environment.apiURL;

    constructor(private http: HttpClient) {
    }

    public getDeliveries():Observable<Delivery[]> {
        return this.http.get<Delivery[]>(`${this.apiServerUrl}/delivery/unaffected`);
    }

    public requestDelivery(deliveryId):Observable<Delivery> {
        return this.http.patch<Delivery>(`${this.apiServerUrl}/delivery/apply`,{deliveryId});
    }
}
