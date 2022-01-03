import {Component, Input, OnInit, ViewChild, NgModule} from '@angular/core';
import {FormGroup, NgForm, NgModel} from '@angular/forms';

@Component({
    selector: 'app-login-info',
    templateUrl: './login-info.component.html',
    styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {
    // @ViewChild('usernameInput')
    // usernameInput: NgModel;
    focus: any;
    focus1: any;
    @Input() registerForm:FormGroup;
    constructor() {
    }

    ngOnInit(): void {
        const el= document.getElementById('email');
        el.focus();
    }

    ngOnDestroy(){
    }

    isUsernameUsed(username):boolean {
        return false;
        return true;
        // vérifier si le username est déja utilisé
    }
    isEmailUsed(username):boolean {
        return false;
        return true;
        // vérifier si le username est déja utilisé
    }
}
