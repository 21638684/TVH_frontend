import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { HomeComponent } from './Account/home/home.component';
import { FacilityComponent } from './Facilities/facility/facility.component';




const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'facility', component: FacilityComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
