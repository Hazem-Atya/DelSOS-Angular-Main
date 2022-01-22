import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from 'app/delsos/model/Store';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StoreProfileService{

    private apiServerUrl = environment.apiURL;

    constructor(private http: HttpClient) {
        localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlleGl3NDA3MjRAc2hvd2Jhei5jb20iLCJzdWIiOiI2MWViMTBkNWRhMTU0YzU3MmY3ZDA2M2EiLCJ0eXBlIjoiU1RPUkUiLCJpYXQiOjE2NDI3OTUyOTEsImV4cCI6MTY0Mjg4MTY5MX0.CpLf2H-zBlqYk2TbMaeWZoMCd9pnhSqVNcxpmvVbbZQ")
    }


    public getStore(): Observable<Store> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
        return this.http.get<Store>(`${this.apiServerUrl}/auth/profile`,{headers});   
    }

    
    public updateStore(updatedStore): Observable<Store> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
        return this.http.post<Store>(`${this.apiServerUrl}/store/update`,updatedStore,{headers});   
    }

    public updatePassword(newPasswordData): Observable<Store> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
        return this.http.post<Store>(`${this.apiServerUrl}/store/update-password`,newPasswordData,{headers});   
    }

}
