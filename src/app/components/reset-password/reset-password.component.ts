import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ResetPassword } from 'src/app/model/reset-password';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  resetPassword(){
   // console.log(email);
    this.authService.resetPassword(this.resetPasswordObj).subscribe(data => {
      console.log(data);
    });
    console.log('Password Changed Sucessfully');
  }
}
