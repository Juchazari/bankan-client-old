import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services';
import { SubmitOnlyErrorStateMatcher } from '@shared/matchers';
import { AlertType } from '@shared/components/alert/alert.component';
import { take } from 'rxjs';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  host: { 'id': 'login-page' },
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,]),
    password: new FormControl('', [Validators.required])
  });
  submitting = false;
  passwordHidden = true;
  matcher = new SubmitOnlyErrorStateMatcher();
  alertType: typeof AlertType = AlertType;
  responseError = false;
  responseErrorMessage: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  closeAlert(): void {
    this.responseError = false;
    this.responseErrorMessage = undefined;
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;

    const loginRequest = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.login(loginRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.submitting = false;
          this.responseError = true;
          this.responseErrorMessage = error.error.message;
        }
      });
  }
}