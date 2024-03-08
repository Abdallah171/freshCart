import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  msgError: string = '';
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  // });

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })


  handleForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message == 'success') {
            localStorage.setItem('eToken', response.token)
            this._AuthService.saveDecodeUserData();

            this._Router.navigate(['/home'])
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
      this.loginForm.markAllAsTouched()
    }
  }
}
