import { Component, OnInit } from '@angular/core';
import { SignIn } from 'src/app/model/sign-in';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  hide = true;
  public signInObj = new SignIn();
message = "";
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }
  
  ngOnInit() {}

  loginUser() {
    this.authService.loginUser(this.signInObj).subscribe(data => {
      localStorage.setItem('token', data.accessToken);
      console.log("login data is", data);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
