import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
<<<<<<< HEAD
import { HomepageComponent } from './delsos/homepage/homepage.component';
import { SignUpComponent } from './delsos/sign-up/sign-up.component';
import { SignInComponent } from './delsos/sign-in/sign-in.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'sign-in', component: SignInComponent }
=======
import {RegisterComponent} from './register/register.component'
const routes: Routes =[
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'login',       component: LoginComponent },
    { path: 'shopper-register', component: RegisterComponent },
    { path: 'partner-register', component: RegisterComponent },
    { path: 'deliveries',       component: ComponentsComponent },
    { path: 'examples/profile',     component: ProfileComponent }
>>>>>>> 379f78abf9b9e217f19aafcb6e395c201fdf72f9
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes) 
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
