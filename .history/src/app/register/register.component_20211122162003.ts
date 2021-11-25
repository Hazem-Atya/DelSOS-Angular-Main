import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    data : Date = new Date();
    focus: any;
    focus1: any;

  /*   constructor() { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    } */
  authDetails!: FormGroup;
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
 
  personal_step = false;
  address_step = false;
  auth_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder) { }
    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.personalDetails = this.formBuilder.group({
            name: ['', Validators.required],
            age: ['', Validators.required],
            phone: ['',Validators.required]
        });
        this.addressDetails = this.formBuilder.group({
            city: ['', Validators.required],
            address: ['', Validators.required],
            pincode: ['',Validators.required]
        });
        this.authDetails = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password: ['',Validators.required]
        });
  }
  get personal() { return this.personalDetails.controls; }
  get education() { return this.authDetails.controls; }
  get address() { return this.addressDetails.controls; }
  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.auth_step = false;
    }
  }
  submit(){
    if(this.step==3){
      this.auth_step = true;
      if (this.authDetails.invalid) { return }
    }
  }
    
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
}

}
