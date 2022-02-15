import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from '../model/delivery';
import { LocalStorageService } from '../sign-in/localstorage.service';
import { DeliveriesCatalogService } from './services/deliveries-catalog.service';
import { JwtService } from 'app/shared/Services/JWTService.service';

@Component({
  selector: 'app-deliveries-catalog',
  templateUrl: './deliveries-catalog.component.html',
  styleUrls: ['./deliveries-catalog.component.scss'] 
})
export class DeliveriesCatalogComponent implements OnInit {

  constructor(
    private deliveryCatalogService: DeliveriesCatalogService,
    private toastr:ToastrService,
    private localStorageService: LocalStorageService,
    private jwtService:JwtService,
  ) { }

  page = 1
  deliveries : Delivery[] = [];
  shownDeliveries = []
  storeId : String = null;

  changePage() {
    this.shownDeliveries = this.deliveries.slice((this.page - 1) * 4, this.page * 4).map(delivery => ({...delivery,isOpen : false}));
  }

  openTrackSection(j){
    this.shownDeliveries[j].isOpen = !this.shownDeliveries[j].isOpen;
  }

  async ngOnInit() {
    this.storeId = this.jwtService.getIdFromToken(this.localStorageService.get('token'));
    await this.deliveryCatalogService.getDeliveries().subscribe(
      (deliveries)=>{
        console.log(deliveries);
        this.deliveries = deliveries.sort((delivery1,delivery2) => delivery1.priority - delivery2.priority);
        if (deliveries.length != 0) {
          this.shownDeliveries = deliveries.slice(0, 4).map(delivery => ({...delivery,isOpen : false}));
          console.log(this.shownDeliveries);
          
        }
      },
      (error)=>{
        this.toastr.error("something went wrong ! contact admin !")
      }
    )

    
  }

  async getAffected(delivery_id){
    await this.deliveryCatalogService.requestDelivery(delivery_id).subscribe(
      (delivery) => {
        console.log(delivery);
        this.toastr.success("Wait for the store to accept your request !")
      },
      (error)=>{
        this.toastr.error("Something went wrong")
      }
    )
  }

}
