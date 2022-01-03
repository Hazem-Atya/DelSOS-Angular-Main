import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {environment} from 'environments/environment';
import {Shopper} from '../model/Shopper';
import {ShopperService} from './service/shopper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    logoPath = environment.logoPath;
    registerFormData: FormGroup;

    focus: any;
    focus1: any;
    steps: Array<number> = [1, 2];
    step: number = 0;

    constructor(
        private router: Router,
        private shopperService: ShopperService,
        private fb: FormBuilder
    ) {
    }

    next() {

        console.log('next');
    }

    submit() {
        console.log('submit');
    }

    back() {
        this.step--;
    }

    onChangeStep(s?: any) {

        if (s !== undefined) {
            this.step = s;
        } else if (this.step === 2) {
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
        console.log(dot);
        //dot.classList.add('active'); 

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.createForm();
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    addShopper() {

        console.log(this.registerFormData.value);
        this.shopperService.addShopper(this.registerFormData.value).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['sign-in'],
                    {
                        queryParams:{'createdAccount':true}
                    });
            },
            (error: HttpErrorResponse) => {
                console.log('There is an error :(');
                console.log(error)
            }
        )
    }

    createForm() {
        this
        this.registerFormData = this.fb.group({
            name: '',
            age: '',
            phoneNumber: '',
            email: '',
            password: '',
            owner: '',
            cardNumber: '',
            expirationDate: ''
        })
    }
    clickNextOrSubmit(event) {
        if(event.key=='Enter')
            this.onChangeStep();
        // else if((event.key=='Backspace')&&(this.step!=0))
        // {
        //     this.back();
        // }
    }
}
