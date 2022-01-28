import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnyRecord } from "dns";
import { environment } from "environments/environment";
import { ShopperEditDto } from "../DTO/shopperEdit.dto";

@Injectable({
  providedIn: 'root'
})
export class ShopperProfileService {


  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  getDeliveries() {
    
  }

  getReviews() {
    
  }

  updateProfile(newShopper: FormData) {

    return this.http.post<any>(`${this.apiServerUrl}/shopper/update`, newShopper);
  }
  editPic(file: FormData) {
    return this.http.post<any>(`${this.apiServerUrl}/shopper/add-pic`, file);
  }

}