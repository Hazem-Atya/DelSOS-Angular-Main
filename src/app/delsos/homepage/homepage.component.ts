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
        this.toastr.success("Delivery fetched ! Start tracking now !!")
      },
      error => {
        this.toastr.error("something went wrong")
      }
    )
  }

  reset(form){
    this.delivery = null
    form.reset()
  }
}
  
