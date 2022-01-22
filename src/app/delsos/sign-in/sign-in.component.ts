import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { IAlert } from '../components/notif/notif.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { SigninService } from './sign-in.service';
import { LocalStorageService } from './localstorage.service';

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
    accountCreatedAlert: IAlert = {
        type: 'success',
        strong: 'Account created successfully',
        message: 'please login'
    };

    constructor(
        private toastr: ToastrService,
        private signinService: SigninService,
        private localStorageService: LocalStorageService,
        private router: Router,
    ) {

    }

    public logoPath: String = environment.logoPath;

    ngOnInit() {
        if (this.signinService.isAuthenticated()) {
            this.router.navigateByUrl('/home')
        }
       
        if (this.loggedin) {
            this.toastr.success(
                'Please type your credentials to login',
                'Account created successfully!');
        }

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }


    login(signinForm : NgForm) {

        if (signinForm.status === 'VALID') {
           
            this.signinService.login(signinForm.value).subscribe(
                (response) => {
                    console.log(response)
                    this.localStorageService.set('token', response.access_token)
                    
                    this.signinService.getProfile(response.access_token).subscribe(
                        (user) => {
                            this.localStorageService.set('role', user.role)
                            if (user['role'] == 'SHOPPER')
                            this.router.navigateByUrl('/deliveries',{ state: user });
                            this.router.navigateByUrl('/store/profile',{ state: user });
                            this.loading = false;
                            this.toastr.success("Welcome Back !");
                        },
                        (error) => {
                            console.log(error)
                            this.toastr.error("Something went wrong, please try again ! ");
                        }
                    )

                },
                (error: HttpErrorResponse) => {
                    console.log(error)
                    this.toastr.error("Wrong credentials");
                }
            )
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
