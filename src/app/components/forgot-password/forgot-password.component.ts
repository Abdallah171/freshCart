import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  SuccessEmailMsg: string = '';
  errEmailMsg: string = '';
  SuccessCodeMsg: string = '';
  errCodeMsg: string = '';
  resetCode: any;
  isLoading: boolean = false;
  success: boolean = false;

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder, private _Router: Router) { }

  forgotPasswordBox: FormGroup = this._FormBuilder.group({
    email: [null],
  })


  sendResetCode(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.forgotPassword(form.value).subscribe({
      next: (response) => {
        this.SuccessEmailMsg = response
        console.log(this.SuccessEmailMsg);
        if (response.statusMsg == 'success') {
          this.success = true
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errEmailMsg = err.error.message

        console.log(this.errEmailMsg);

      }
    })

  }



  verifyCodeBox: FormGroup = new FormGroup({

    resetCode: new FormControl()

  });


  verifyResetCode(form: FormGroup): void {

    this._AuthService.verifyCode(form.value).subscribe({
      next: (response) => {
        this.SuccessCodeMsg = response.message
        console.log(response);

        if (response.status == 'Success') {
          this._Router.navigate(['/resetPassword'])
        }

      },
      error: (err) => {
        this.errCodeMsg = err.error.message

        console.log(err);
      }
    })

  }



}
