import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {environment} from 'environments/environment';
import {Shopper} from '../model/Shopper';
import {ShopperService} from './service/shopper.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    logoPath = environment.logoPath;
    registerFormData: FormGroup;
    nextOrSubmitButton;
    focus: any;
    focus1: any;
    steps: Array<number> = [1, 2];
    step: number = 0;
    loading = false;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private shopperService: ShopperService,
        private fb: FormBuilder
    ) {
    }

    next() {
        this.nextOrSubmitButton.disabled=true;
        console.log('next');
    }

    submit() {
        console.log('submit');
    }

    back() {
        this.nextOrSubmitButton.disabled=false;
        this.step--;
    }

    onChangeStep(s?: any) {

        if (s !== undefined) {
            this.step = s;
        } else if (this.step === 2) {
            this.loading = true;
            this.addShopper();

        } else {
            this.next();
            this.step++;
        }


        var dot;
        for (let i = 0; i < 3; i++) {
            dot = document.getElementById(i.toString());
            if (this.step > i) {
                dot.classList.remove('active');
                dot.classList.add('finish');
            } else if (this.step < i) {
                dot.classList.remove('active');
            } else {
                dot.classList.add('active');
            }

        }

    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var dot = document.getElementsByClassName('step');
  
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.createForm();
        console.log(this.registerFormData)
        this.nextOrSubmitButton={disabled:true};
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    addShopper() {


        this.shopperService.addShopper(this.registerFormData.value).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['sign-in'],
                    {
                        queryParams: {'createdAccount': true}
                    });
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                console.log('There is an error :(');
                console.log(error);
                const errorMessages = error.error.message;
                if (typeof errorMessages === 'string') {
                    this.toastr.error(errorMessages, '', {
                        disableTimeOut: true,
                        extendedTimeOut: 4000
                        //       timeOut:5000
                    })
                } else {
                    errorMessages.forEach(
                        (msg) => {
                            this.toastr.error(msg, '', {
                                extendedTimeOut: 4000
                                //       timeOut:5000
                            });
                        }
                    );
                }

                this.loading = false;

            }
        )
    }

    createForm() {

        this.registerFormData = this.fb.group({
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
    // convenience getter for easy access to form fields

    clickNextOrSubmit(event) {
        if (event.key == 'Enter' && this.nextOrSubmitButton.disabled===false) {
            this.onChangeStep();
        }
        // else if((event.key=='Backspace')&&(this.step!=0))
        // {
        //     this.back();
        // }
    }
}
