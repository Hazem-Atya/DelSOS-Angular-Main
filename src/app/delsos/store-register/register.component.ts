import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { StoreService } from './service/store.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-store-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class StoreRegisterComponent implements OnInit {

    logoPath = environment.logoPath;
    registerFormData: FormGroup;
    focus: any;
    focus1: any;
    loading = false;
    filename;
    valid = false;


    constructor(
        private toastr: ToastrService,
        private router: Router,
        private storeService: StoreService,
        private fb: FormBuilder
    ) {
    }




    get f() {
        return this.registerFormData.controls;
    }
    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var dot = document.getElementsByClassName('step');

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

    sendRequest(file: FormData) {
        console.log(this.registerFormData)
        file.append('website', this.registerFormData.value.website);
        file.append('email', this.registerFormData.value.email);
        file.append('name', this.registerFormData.value.name);


        this.storeService.sendRequest(file).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['home'])
                this.loading = false;
                this.toastr.success('your request has been successfully sent, wait for the admin approvement')

            },
            (error: HttpErrorResponse) => {
                this.toastr.error('There is an error')
                console.log(error);
                this.loading = false;

            }
        )
    }




    createForm() {
        const urlreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        this.registerFormData = this.fb.group({
            name: ['',
                Validators.required],
            website: ['',
                Validators.pattern(urlreg)],
            file: ['',
                Validators.required,],
            email: ['',
                [Validators.required, Validators.email]],

        })
    }

    onFileSelect(event) {

        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file)
            this.filename = file.name;
            this.registerFormData.get('file').setValue(file);
        }
    }
    onSubmit() {
        if (this.registerFormData.valid) {
            const formData = new FormData();
            formData.append('file', this.registerFormData.get('file').value);

            this.sendRequest(formData)
        }
        else {

            console.log('not valid')
        }
        console.log('submit');
    }

}
