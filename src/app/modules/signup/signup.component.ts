import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services';
import { SubmitOnlyErrorStateMatcher } from '@shared/matchers';
import { take } from 'rxjs';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.component.html',
  host: { 'id': 'signup-page' },
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent {

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  submitting = false;
  passwordHidden = true;
  matcher = new SubmitOnlyErrorStateMatcher();

  constructor(private router: Router, private authService: AuthService) {
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    
    const signupRequest = {
      fullName: this.fullName.value,
      email: this.email.value,
      password: this.password.value
    };

    this.authService.signup(signupRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          this.submitting = false;
        }
      });
  }
}