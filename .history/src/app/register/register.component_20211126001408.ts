import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    data : Date = new Date();
    focus: any;
    focus1: any;
    steps: Array<number> = [0,1,2];
    step: number = 0;
 constructor() { }
    onChangeStep(s?: any) {
        if (s) this.step = s;
        else
        if (this.step == 2) this.step = 0;
       else this.step++;
        console.log(this.step);

        var dot;
        for (let i = 0; i < 3; i++) {
            dot = document.getElementById(i.toString());
            if (this.step !== i) dot.classList.remove('active');
                else if(this.step < i && !s) dot.classList.add('finish');
            else dot.classList.add('active');
            console.log(i);
          }

    }
    
    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var dot = document.getElementById("1");
        console.log(dot);
        //dot.classList.add('active'); 

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    } 


}
