import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlert } from '../components/notif/notif.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { ShopperService } from '../register/service/shopper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    focus;
    focus1;
    loggedin = false;
    loading = false;
    isValid = false;
    signinFormData: FormGroup;
    accountCreatedAlert: IAlert = {
        type: 'success',
        strong: 'Account created successfully',
        message: 'please login'
    };

    constructor(
        private toastr: ToastrService,
        private shopperService: ShopperService,
        private router: Router,
      ) {

    }

    public logoPath: String = environment.logoPath;

    ngOnInit() {
        if (this.loggedin) {
            this.toastr.success(
                'Please type your credentials to login',
                'Account created successfully!');
        }

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.createForm();
    
    }
    get status() { return this.signinFormData.status }
    get form() { return this.signinFormData; }
    get email() { return this.signinFormData.get('email') }
    get password() { return this.signinFormData.get('password') }
    createForm() {
        this.signinFormData = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.email

            ]),

            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

        console.log(this.signinFormData)
    }
test(){
    this.s
}
    login() {
        console.log(this.signinFormData.value)
        if (this.signinFormData.value === 'VALID') {
             /* this.shopperService.login(this.signinFormData.value).subscribe(
             (response) => {
                 console.log(response);
                 this.router.navigate(['profile'],
                     {
                         queryParams: {'token' : response.token}
                     });
                 this.loading = false;
             },
             (error: HttpErrorResponse) => { console.log(error) }
         )**/
        }
        else {
            this.toastr.error("Please give valid data");
        }
       
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    printPath() {

    }
    onSubmit(formulaire: NgForm) {
        console.log(formulaire);
    }
}
