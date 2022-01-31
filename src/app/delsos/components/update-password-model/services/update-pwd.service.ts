import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { UpdatePwdDto } from "../DTO/update-pwd.dto";

@Injectable({
  providedIn: 'root'
})
export class updatePwdService {

  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }


  public updatePassword(password: UpdatePwdDto): Observable<UpdatePwdDto> {
    return this.http.post<UpdatePwdDto>(`${this.apiServerUrl}/shopper/update-password`, password);
  }
  
}