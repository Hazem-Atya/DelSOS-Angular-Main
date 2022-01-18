import {Component, OnInit, SimpleChanges} from '@angular/core';
import {environment} from 'environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {IAlert} from '../components/notif/notif.component';
import {ToastrService} from 'ngx-toastr';
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

    get control() { return this.signinFormData.controls; }
    get email() { return this.signinFormData.get('email') }
    get password() {return this.signinFormData.get('password')}
    createForm() {

        /*this.signinFormData = this.formBuilder.group({
            email: ['',
                Validators.required, Validators.pattern('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$')],
            password: ['',
                Validators.required, Validators.minLength(8)],

        })*/
        this.signinFormData = new FormGroup({
            email: new FormControl(this.hero.name, [
              Validators.required,
                Validators.minLength(4),
              Validators.
          
            ]),
        
            power: new FormControl(this.hero.power, Validators.required)
          });

        console.log(this.signinFormData)
    }

    login() {
        console.log(this.signinFormData.value)
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
