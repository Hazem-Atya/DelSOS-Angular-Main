import {Component, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {ActivatedRoute} from '@angular/router';
import {IAlert} from '../components/notif/notif.component';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, NgModel } from '@angular/forms';

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
    createForm() {

        this.signinFormData = this.fb.group({
            name: ['',
                Validators.required],
            age: ['',
                Validators.required],
            phoneNumber: ['',
                [Validators.required, Validators.minLength(8),
                  Validators.pattern('[0-9]+')]
                ],

            email: ['',
                [Validators.required, Validators.email]],
            password: ['',
                [Validators.required,Validators.minLength(5)]],
            owner: ['',
                [Validators.required, Validators.minLength(5)]],
            cardNumber: ['',
                [Validators.required, Validators.minLength(5),
                    Validators.pattern('[0-9]+')
                ]],
            expirationDate: ['',
                Validators.required]
        })
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
