import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/service/auth.service';
import { SignUp } from 'src/app/model/sign-up';
// Error when invalid control is dirty, touched.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  EMAIL_PATTERN = /^[a-zA-Z0-9]{1,}([.\_\+\-]?[a-zA-Z0-9]{1,})?[@]{1}[a-zA-Z0-9]{1,}[.]{1}[a-zA-Z]{2,3}([.]?[a-z]{2})?$/;
  hide = true;
  public signUpObj = new SignUp();
  constructor(private authService: AuthService) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.EMAIL_PATTERN),
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }
registerUser(){
  this.authService.registerUser(this.signUpObj).subscribe(data => {
    console.log(data);
  });
  console.log("Register successfully");
}
}