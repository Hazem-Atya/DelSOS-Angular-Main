import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
    focus: any;
    focus1: any;
    @Input() registerForm: FormGroup;
    @Input() nextButton
    constructor() {

    }

    ngOnInit(): void {
        const el= document.getElementById('fullName');
        el.focus();
        this.checkFormValidity()

    }

    ngOnDestroy() {
    }
    get f() { return this.registerForm.controls; }
    toggleType(event: FocusEvent, birthdate: HTMLInputElement) {
        if (event.type == 'focusout' && birthdate.value == '') {
            birthdate.type = 'text'
        } else {
            birthdate.type = "date";
        }
    }
    checkFormValidity() {
        console.log("birthdate" ,this.f.birthdate.invalid )
        this.nextButton.disabled=this.f.name.invalid ||this.f.phoneNumber.invalid
            || this.f.birthdate.invalid || this.f.address.invalid;
        console.log(this.registerForm);

    }

}
