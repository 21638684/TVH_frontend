import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { HomeComponent } from './Account/home/home.component';
import { FacilityComponent } from './Facilities/facility/facility.component';
import { CreateFacilityComponent } from './Facilities/create-facility/create-facility.component';
import { EventComponent } from './Client/event/event.component';
import { ClientHomeComponent } from './Client/client-home/client-home.component';
import { ClientFacilityComponent } from './Client/client-facility/client-facility.component';
import { PaymentComponent } from './Client/payment/payment.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'events', component: EventComponent  },
  { path: 'client-home', component: ClientHomeComponent},
  { path: 'client-facility', component: ClientFacilityComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'event', component: EventComponent },
  { path: 'home', component: HomeComponent },
  { path: 'facility', component: FacilityComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'create-facility', component: CreateFacilityComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
