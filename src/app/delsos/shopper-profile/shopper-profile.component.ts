import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as Rellax from 'rellax';import { Shopper } from '../register/DTO/shopper-register.dto';
import { LocalStorageService } from '../sign-in/localstorage.service';
@Component({
  selector: 'app-shopper-profile',
  templateUrl: './shopper-profile.component.html',
  styleUrls: ['./shopper-profile.component.scss']
})
export class ShopperProfileComponent implements OnInit {

  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
  data: Date = new Date();
  editable : Boolean = false
  focus;
  page = 1;
  cin = 'assets/img/no-pic.jpg';
   
  pageSize = 3;
  collectionSize = 20;
  focus1;
  user: any = {
    name: "",
    age: 0,
  }

  deliveries: any[] = [
    {
      name: "del1",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      date: "20/12/2021"
    },
    {
      name: "del2",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      date: "08/10/2021"
    }
  ]

  // user;
  constructor(private location: Location, private LocalStorageService : LocalStorageService) { }

  ngOnInit() {
  
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');


    this.user = JSON.parse(this.LocalStorageService.get('user'))
    console.log(this.user)
    if (this.user.cin) {
  this.cin = this.user.cin
}

  }
  

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  percent = 40;

  outerStrokeColor() {
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

  back() {
    this.editable = false
  }

  edit() {
    this.editable = true
  }
  update() {
    
  }
}
