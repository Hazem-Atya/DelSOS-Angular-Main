import {Component, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    focus;
    focus1;
    createdAccount = false;

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams.subscribe(
            (param) => this.createdAccount = param['createdAccount']
        )
    }

    public logoPath: String = environment.logoPath;

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    printPath() {

    }
}
