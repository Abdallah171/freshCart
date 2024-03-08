import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  msgError: string = '';
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },

    { validators: [this.confirmPassword] } as FormControlOptions);


  confirmPassword(group: FormGroup): void {

    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true })

    }

    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ notMatch: true })
    }
  }


  handleForm(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;

      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {

          // console.log(response);
          if (response.message == 'success') {
            this._Router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.isLoading = false;
          // console.log(err);

          this.msgError = err.error.message;


        }
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }
}
