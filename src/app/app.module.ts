import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { JwtInterceptor } from './Auth/jwt.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuccessDialogComponent } from './Dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './Dialogs/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './Dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './Dialogs/dialog.service';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Account/home/home.component';
import { FacilityComponent } from './Facilities/facility/facility.component';
import { CreateFacilityComponent } from './Facilities/create-facility/create-facility.component';
import { ClientFacilityComponent } from './Client/client-facility/client-facility.component';
import { EventComponent } from './Client/event/event.component';
import { ClientHomeComponent } from './Client/client-home/client-home.component';
import { PaymentComponent } from './Client/payment/payment.component';
import { BookingsComponent } from './Facilities/bookings/bookings.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SidebarComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    FacilityComponent,
    CreateFacilityComponent,
    ClientFacilityComponent,
    EventComponent,
    ClientHomeComponent,
    PaymentComponent,
    BookingsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatPaginatorModule,
    NgbModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DialogService,
    provideAnimationsAsync()  // Add DialogService here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


