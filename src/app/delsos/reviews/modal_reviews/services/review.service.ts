import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReviewDTO} from '../DTO/review.dto';
import {Observable} from 'rxjs';
import {Shopper} from '../../../register/DTO/shopper-register.dto';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiServerUrl = environment.apiURL;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<ReviewDTO[]> {
        //return null
        return this.http.get<ReviewDTO[]>(`${this.apiServerUrl}/review/all`)
    }

    getUserData() {
        const user = this.http.get<Shopper>(`${this.apiServerUrl}/auth/profile`)
            .pipe(map((user) => {

                localStorage.set('user', JSON.stringify(user));

                return user;
            }));

        console.log(user)
    }

}
