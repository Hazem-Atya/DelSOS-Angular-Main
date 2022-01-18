import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-bank-info',
    templateUrl: './bank-info.component.html',
    styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {
    focus: any;
    focus1: any;
    @Input() registerForm: FormGroup;

    @Input() submitButton;
    constructor() {
    }

    ngOnInit(): void {
        const el = document.getElementById('cardNumber');
        el.focus();
    }

    toggleType(event: FocusEvent, expirationDate: HTMLInputElement) {
        if (event.type == 'focusout' && expirationDate.value == '') {
            expirationDate.type = 'text'
        } else {
            expirationDate.type = "date";
        }
    }
   / get f() { return this.registerForm.controls; }

    checkFormValidity() {
        this.submitButton.disabled=this.f.owner.invalid ||
            this.f.cardNumber.invalid
            || this.f.expirationDate.invalid;
        console.log(this.registerForm);

    }
}
