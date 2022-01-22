import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from 'environments/environment';
import {StoreService} from './service/store.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-store-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class StoreRegisterComponent implements OnInit {

    logoPath = environment.logoPath;
    registerFormData: FormGroup;
    nextOrSubmitButton;
    focus: any;
    focus1: any;
    loading = false;
   
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private storeService: StoreService,
        private fb: FormBuilder
    ) {
    }


    onSubmit() {
        console.log('submit');
    }


    get f() { return this.registerFormData.controls; }
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


        this.storeService.addShopper(this.registerFormData.value).subscribe(
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
                        extendedTimeOut: 4000
                        //       timeOut:5000
                    })
                } else if (errorMessages){
                    errorMessages.forEach(
                        (msg) => {
                            this.toastr.error(msg, '', {
                                extendedTimeOut: 4000
                                //       timeOut:5000
                            });
                        }
                    );
                }else {
                    this.toastr.error('Server error, please contact the admin');
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
            address: ['',
                [Validators.required, Validators.minLength(6)]],
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

   
}
