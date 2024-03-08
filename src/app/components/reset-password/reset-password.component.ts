import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  msgError: string = '';
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null],
    newPassword: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  resetSubmit(): void {
    this.isLoading = true;
    if (this.resetPasswordForm.valid) {
      this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (response) => {
          this._Router.navigate(['/login'])

          this.isLoading = false;

        },
        error: (err) => {
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err);
        }
      })
    }

  }
}
