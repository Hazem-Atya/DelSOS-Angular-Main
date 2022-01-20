import {Component, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {IAlert} from '../components/notif/notif.component';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
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
    createdAccount = false;
    loading = false;
    signinFormData: FormGroup;
    accountCreatedAlert: IAlert = {
        type: 'success',
        strong: 'Account created successfully',
        message: 'please login'
    };

    constructor(
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private shopperService: ShopperService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams.subscribe(
            (param) => this.createdAccount = param['createdAccount']
        )
    }

    public logoPath: String = environment.logoPath;

    ngOnInit() {
        if (this.createdAccount) {
            this.toastr.success(
                'Please type your credentials to log in',
                'Account created successfully!');
        }
       
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.createForm();
       
    }
    ngOnC
    get control() { return this.signinFormData.controls; }
    createForm() {

        this.signinFormData = this.formBuilder.group({
            email: ['',
                Validators.required, Validators.email],
            password: ['',
                Validators.required, Validators.min(8)],

        })
    }

    login() {
        this.shopperService.login(this.signinFormData.value).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['profile'],
                    {
                        queryParams: {'token' : response.token}
                    });
                this.loading = false;
            },
            (error: HttpErrorResponse) => { console.log(error) }
        )
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    printPath() {

    }
    onSubmit(formulaire: NgForm){
        console.log(formulaire);
    }
}
