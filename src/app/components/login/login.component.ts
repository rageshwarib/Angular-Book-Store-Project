import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SignIn } from 'src/app/model/sign-in';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

// Error when invalid control is dirty, touched.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  NAME_PATTERN = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  hide = true;
  public signInObj = new SignIn();
message = "";
  constructor(private authService: AuthService, private routes : Router) { }
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.NAME_PATTERN),
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {}
  loginUser(){
    this.authService.loginUser(this.signInObj).subscribe(data => {
      localStorage.setItem("token", data.accessToken);
      console.log(data);
    });
    console.log('Login User');
  }

}
