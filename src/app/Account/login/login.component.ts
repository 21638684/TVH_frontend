import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { DialogService } from '../../Dialogs/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Remove any existing token when the component initializes
    localStorage.removeItem('token');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.isLoading) return;
    if (this.loginForm.invalid) {
      this.dialogService.showError('Please fill in the form correctly.');
      return;
    }
  
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.isLoading = false;
        localStorage.setItem('token', response.token);
        console.log('Login successful');
        this.dialogService.showSuccess('Login successful.');
  
        // Get the user's role from the token
        const userRole = this.authService.getUserRole();
  
        if (userRole === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.isLoading = false;
        console.error('Login error', error);
        this.dialogService.showError('Login failed. Please check your credentials and try again.');
      }
    );
  }
}



