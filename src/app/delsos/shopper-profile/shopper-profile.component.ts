import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as Rellax from 'rellax';
import { Shopper } from '../register/DTO/shopper-register.dto';
import { LocalStorageService } from '../sign-in/localstorage.service';
import { ShopperProfileService } from './services/shopper-profile.service';
import { ToastrService } from 'ngx-toastr';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { SigninService } from 'app/delsos/sign-in/sign-in.service';
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
  editable: Boolean = false
  focus;
  focus1;
  displayButton = false;
  picture ="assets/img/placeholder.png"
  cinURL: string;
  page = 1;
  cin = 'assets/img/no-pic.jpg';
  filename : string;
  pageSize = 3;
  file;

  user: any = {
    name: "",
    age: 0,
  }


  deliveries: any[] = [
    {
      name: "del1",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      date: "20/12/2021",
      status : "arrived"
    },
    {
      name: "del2",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      date: "08/10/2021",
      status : "not_picked_up"
    }
  ]
  collectionSize = this.deliveries.length;
  // user;
  constructor(private location: Location, private toastr: ToastrService,
    private signinService : SigninService,
    private LocalStorageService: LocalStorageService,
    private shopperProfileService: ShopperProfileService) { }

  ngOnInit() {
    console.log(this.signinService.getShopper())
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  
    this.user = JSON.parse(this.LocalStorageService.get('user'))
    if (this.user.cin) {
      this.cin = this.user.cin
      this.cinURL = environment.apiURL +'/' +this.user.cin.filename
      console.log(this.cinURL)
    }

    if (this.user.picture) {
      this.picture =  environment.apiURL +'/' + this.user.picture
    }

    this.getDeliveries(2,0)

  }

  getDeliveries(limit, skip) {
    this.shopperProfileService.getDeliveries(limit,skip).subscribe((deliveries) => {
      console.log(deliveries)
    },
      (error) => {
      
    })
  }
  openModal(){
  
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  percent = 40;

  outerStrokeColor() {
    if (this.percent >= 100) {
      return "#28a745"
    } else if (this.percent > 0) {
      return "#fd7e14"

    } else {
      return "#dc3545"
    }
  }
  formatSubtitle = (percent: number): string => {
    if (percent >= 100) {
      return "Delivered!"
    } else if (percent > 0) {
      return "On the road"

    } else {
      return "Not picked up"
    }
  }

  back() {
    this.editable = false
  }

  edit() {
    this.editable = true
  }
  onFileSelect(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {

        this.cinURL = reader.result as string;


      };
      console.log(this.cinURL)
      this.filename = this.file.name;

    }
  }
  onSubmit(form) {
    const formData = new FormData();

    let values = form.form.value

    for (let [key, value] of Object.entries(values)) {
      if (value !== "") {
        if (key === "cin")
          formData.append(key, this.file)
        formData.append(key, value.toString())
      }
    }
    this.shopperProfileService.updateProfile(formData).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response))
        this.toastr.success('Profile updated successfully')
        this.editable = false
      }
      ,
      (error) => {
        console.log(error)
        this.toastr.error('Something went wrong ! try again later')
      }
    )
  }
  
  
  onPicSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {

        this.picture = reader.result as string;
        this.displayButton = true
       
      }
     


    }
  }
  editPic() {
    let picture = new FormData()
picture.append('pic', this.file)
    this.shopperProfileService.editPic(picture).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response))
        this.displayButton = false
        this.toastr.success("Picture updated successfully")
      },
      (error) => {
        this.toastr.error('Something went wrong ! ')
      }
    )
  }
}
