import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-delivery-card-shopper',
  templateUrl: './delivery-card-shopper.component.html',
  styleUrls: ['./delivery-card-shopper.component.scss']
})
export class DeliveryCardShopperComponent implements OnInit {

  @Input() delivery: any; 
  percent = 100
  
  constructor() { }

  ngOnInit(): void {
  } outerStrokeColor() {
    if(this.percent >= 100){
      return "#28a745"
    }else if(this.percent > 0){
      return "#fd7e14" 

    }else {
      return "#dc3545"
    }
  }
  formatSubtitle = (percent: number) : string => {
    if(percent >= 100){
      return "Delivered!"
    }else if(percent > 0){
      return "On the road"

    }else {
      return "Not picked up"
    }
  }

}
