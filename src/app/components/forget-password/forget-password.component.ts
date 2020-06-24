import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
// Error when invalid control is dirty, touched.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  EMAIL_PATTERN = /^[a-zA-Z0-9]{1,}([.\_\+\-]?[a-zA-Z0-9]{1,})?[@]{1}[a-zA-Z0-9]{1,}[.]{1}[a-zA-Z]{2,3}([.]?[a-z]{2})?$/;

  constructor() { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.EMAIL_PATTERN),
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

}
