import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PersonalInfoComponent } from './register/personal-info/personal-info.component';
import { LoginInfoComponent } from './register/login-info/login-info.component';
import { BankInfoComponent } from './register/bank-info/bank-info.component';
import { AddressInfoComponent } from './register/address-info/address-info.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RegisterComponent,
        FooterComponent,
        FormSectionComponent,
        PersonalInfoComponent,
        LoginInfoComponent,
        BankInfoComponent,
        AddressInfoComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
