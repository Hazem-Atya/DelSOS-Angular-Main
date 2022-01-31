import {Component, Input, OnInit, ViewChild, NgModule} from '@angular/core';
import {FormGroup, NgForm, NgModel} from '@angular/forms';

@Component({
    selector: 'app-login-info',
    templateUrl: './login-info.component.html',
    styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent implements OnInit {
    // @ViewChild('usernameInput')
    // usernameInput: NgModel;
    focus: any;
    focus1: any;
    @Input() registerForm:FormGroup;
    @Input() nextButton ;
    constructor() {
    }

    ngOnInit(): void {
        const el= document.getElementById('email');
        el.focus();
        console.log('here it is:',this.nextButton)
    }

    ngOnDestroy(){

    }


    get f() { return this.registerForm.controls; }

    checkFormValidity() {
        this.nextButton.disabled=this.f.password.invalid ||this.f.email.invalid;
    }
}
