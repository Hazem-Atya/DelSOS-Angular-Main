import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { HomepageComponent } from './delsos/homepage/homepage.component';
import { SignInComponent } from './delsos/sign-in/sign-in.component';
import { RegisterComponent } from './delsos/register/register.component'
import { ShopperProfileComponent } from './delsos/shopper-profile/shopper-profile.component';
import {NotFoundPageComponent} from './delsos/components/not-found-page/not-found-page.component';
import {  SigninGuard } from './guards/signin.guard';
import { StoreProfileComponent } from './delsos/store-profile/store-profile.component';
import { StoreRegisterComponent } from './delsos/store-register/register.component';


const routes: Routes = [

    {
        path: 'shopper',
        children :[
    
            { path: 'profile', component: ShopperProfileComponent, canActivate: [SigninGuard], }, 
            { path: 'register', component: RegisterComponent,},

        ]
    },
    {
        path: 'store',
        children: [
            { path: 'profile', component: ShopperProfileComponent, canActivate: [SigninGuard], },
            { path: 'register', component: StoreRegisterComponent, },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    // { path: 'profile', component: ProfileComponent, canActivate: [SigninGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'sign-in', component: SignInComponent, },
    {path: '**',component:NotFoundPageComponent }
]

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
