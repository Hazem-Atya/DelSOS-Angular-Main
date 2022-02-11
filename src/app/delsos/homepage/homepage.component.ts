import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from '../model/delivery';
import { HomePageService } from './services/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  logoPath: String = environment.logoPath;

  constructor(private homePageService: HomePageService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }

  delivery = null;

  async submitTrackDelivery(form){
    await this.homePageService.getDelivery(form.value.deliveryId).subscribe(
      res => {
        this.delivery = res;
        this.toastr.error("Delivery found, Start tracking now !!")
      },
      error => {
        this.delivery={
          "_id": "61eedbaa943acc59aceaeb19",
          "description": "this is the second package",
          "source": "source 2 ",
          "destination": "destination 2 ",
          "store": "61eb10d5da154c572f7d063a",
          "weight": 2.2,
          "height": 2.2,
          "width": 2.2,
          "type": [
              "breakable",
              "furniture",
              "package",
              "furniture",
              "furniture",
              "furniture",
              "furniture",
              "furniture"
          ],
          "priority": "1",
          "status": "2",
          "trackingHistory": [
              {
                  "date": "2022-01-24T16:24:16.647Z",
                  "description": "this is the first location",
                  "location": "first location",
                  "_id": "61eedbaa943acc59aceaeb1a"
              },
              {
                  "date": "2022-01-24T18:00:00.000Z",
                  "description": "moved to second location",
                  "location": "second location",
                  "_id": "61ef18517bd69db756cc44a1"
              },
              {
                  "date": "2022-02-24T23:00:00.000Z",
                  "description": "moved to third location",
                  "location": "third location",
                  "_id": "61ef18ad7bd69db756cc44a2"
              },
              {
                  "date": "2022-02-26T23:00:00.000Z",
                  "description": "moved to fourth location",
                  "location": "fourth location",
                  "_id": "61ef18ee7bd69db756cc44a3"
              }
          ],
          "applicants": [
              "61f3028ba495e96c349860c8",
              "61f30283a495e96c349860c5",
              "61f30270a495e96c349860c2"
          ],
          "createdAt": "2022-01-24T17:02:34.503Z",
          "updatedAt": "2022-01-28T00:04:38.837Z",
          "__v": 0,
          "shopper": {
              "bankDetails": {
                  "owner": "hamza1",
                  "cardNumber": "123456789",
                  "expirationDate": "2022-01-27T19:56:28.232Z"
              },
              "_id": "61f3028ba495e96c349860c8",
              "name": "hamza3",
              "email": "a3@b.com",
              "username": "shopper-hamza3-delsos",
              "phoneNumber": "12345678",
              "role": "SHOPPER",
              "birthdate": "2022-01-26T19:56:48.073Z",
              "range": 0,
              "address": "blassa",
              "status": "ACTIVATED",
              "createdAt": "2022-01-27T20:37:31.173Z",
              "updatedAt": "2022-01-27T20:37:31.173Z",
              "__v": 0
          }
      }
        this.toastr.error("something went wrong")
      }
    )
  }

  reset(form){
    this.delivery = null
    form.reset()
  }
}
  
