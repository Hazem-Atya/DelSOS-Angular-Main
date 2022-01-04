import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomepageComponent } from './delsos/homepage/homepage.component';
import { NavigationBarComponent } from './delsos/components/navigation-bar/navigation-bar.component';
import { SignInComponent } from './delsos/sign-in/sign-in.component';
import { RegisterComponent } from './delsos/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PersonalInfoComponent } from './delsos/register/personal-info/personal-info.component';
import { LoginInfoComponent } from './delsos/register/login-info/login-info.component';
import { BankInfoComponent } from './delsos/register/bank-info/bank-info.component';
import { FooTerComponent } from './delsos/components/foo-ter/foo-ter.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifComponent } from './delsos/components/notif/notif.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomepageComponent,
        NavigationBarComponent,
        SignInComponent,
        RegisterComponent,
        FooterComponent,
        PersonalInfoComponent,
        LoginInfoComponent,
        BankInfoComponent,
        FooTerComponent,
        NotifComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
