import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ForgotPassword } from 'src/app/model/forgot-password';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

public forgotPasswordObj = new ForgotPassword();
  constructor(public authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  forgotPassword(email){
    console.log(email);
    this.authService.forgotPassword(email).subscribe(data => {
      console.log(data);
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }

}