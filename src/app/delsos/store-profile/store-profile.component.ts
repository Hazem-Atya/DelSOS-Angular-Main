import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { Store } from '../model/Store';
import { StoreProfileService } from './service/store-service.service';
import { InfoItemComponent } from './info-item/info-item/info-item.component';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from '../model/delivery';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.css']
})
export class StoreProfileComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
  data: Date = new Date();
  focus;
  focus1;

  store: Store = null
  deliveries: Delivery[] = []
  archive : Delivery[] = []
  subAddress: string = ''
  constructor(
    private storeProfileService: StoreProfileService,
    private toastr: ToastrService
  ) { }

  passwordData = {
    "newPassword": '',
    "currentPassword": '',
    "confirmPassword": '',
  }

  DELIVERY_TYPE = ['breakable', 'hazardous', 'furniture', 'package', 'liquid', 'can expire', 'electronics']

  PRIORITE = ['High', 'Normal', 'Low']

  page = 1
  pageArchive = 1
  math = Math
  shownDeliveries: Delivery[] = []
  shownArchive: Delivery[] = []

  changePage(isArchive) {
    if(!isArchive){
      this.shownDeliveries = this.deliveries.slice((this.page - 1) * 4, this.page * 4)
    }

  }

  async ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    await this.storeProfileService.getStore().subscribe(
      store => {
        this.store = store
        this.subAddress += store.address['country'] + "-" + store.address['city'] + "-" + store.address['postalCode']
      },
      error => this.toastr.error("error in fetching store, contact admin")
    )

    await this.storeProfileService.getDeliveries().subscribe(
      deliveries => {
        console.log(deliveries);
        this.deliveries = deliveries
        if (deliveries.length != 0) {
          this.shownDeliveries = deliveries.slice(0, 4)
        }
      },
      error => this.toastr.error("something went wrong when fetching deliveries, contact admin ! ")
    )

    await this.storeProfileService.getArchive().subscribe(
      ArchivedDeliveries => {
        console.log("archive",ArchivedDeliveries);
        this.archive = ArchivedDeliveries
        if (ArchivedDeliveries.length != 0) {
          this.shownArchive = this.archive.slice(0, 4)
        }
      },
      error => this.toastr.error("something went wrong when fetching deliveries, contact admin ! ")
    )
  }

  async sumbitUpdateForm(updateForm) {
    const { city, country, address, postalCode, ...info } = updateForm.value
    const fulladdress = {
      "city": city,
      "country": country,
      "address": address,
      "postalCode": postalCode,
    }

    await this.storeProfileService.updateStore({
      ...info,
      "address": fulladdress
    }).subscribe(
      updatedstore => {
        this.store = updatedstore
        this.subAddress += updatedstore.address['country'] + "-" + updatedstore.address['city'] + "-" + updatedstore.address['postalCode']
        this.toastr.success("profile updated successfully")
      },
      error => {
        this.toastr.error("something went wrong !!")
      }
    )
  }

  sumbitResetPassword(resetPasswordForm) {
    const passwordData = resetPasswordForm.value

    if (passwordData.confirmPassword != passwordData.newPassword) {
      this.toastr.error("passwords must be identical")
    } else {
      console.log(passwordData);

      this.storeProfileService.updatePassword(passwordData).subscribe(
        done => this.toastr.success("Password updated successfully !"),
        error => this.toastr.error("Something went wrong !")
      )
    }
  }

  async submitCreateDelivery(createDeliveryForm) {
    const { description, destination, height, priority, source, weight, width, ...types } = createDeliveryForm.value
    const propertyValues = Object.values(types);
    const type = propertyValues.filter(item => item != '')
    if (type.length == 0)
      this.toastr.error("must have at least one type !")
    else if (priority == '') {
      this.toastr.error("must have a priority !")
    }
    else {
      const createDelivery = {
        description,
        destination,
        height,
        priority: parseInt(priority),
        source,
        weight,
        width,
        type,
        trackingHistory: [{
          date: new Date(),
          description: "Delivery at " + source,
          location: source,
        }]
      }
      await this.storeProfileService.createDelivery(createDelivery).subscribe(
        res => {
          console.log(res.body);

          this.deliveries.push(res.body)
          this.toastr.success("Delivery created successfully, check your deliveries section !")
          console.log(this.deliveries[this.deliveries.length - 1]);

        },
        error => this.toastr.error("something went wrong")

      )
    }
  }
}

