import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Delivery } from 'app/delsos/model/delivery';
import { Store } from 'app/delsos/model/Store';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomePageService{ 
    
    private apiServerUrl = environment.apiURL;

    constructor(private http: HttpClient) {
    }

    public getDelivery(id):Observable<Delivery> {
        return this.http.get<Delivery>(`${this.apiServerUrl}/delivery/${id}`);
    }

}
