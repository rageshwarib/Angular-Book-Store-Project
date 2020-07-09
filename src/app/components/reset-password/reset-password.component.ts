import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ResetPassword } from 'src/app/model/reset-password';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  public resetPasswordObj = new ResetPassword();
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  resetPassword(){
    this.authService.resetPassword(this.resetPasswordObj).subscribe(data => {
    localStorage.setItem('token', data.accessToken);
    console.log(data);
    });
    console.log('Password Changed Sucessfully');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }
}