import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

// Error when invalid control is dirty, touched.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @Input() form: any;
  public isButtonVisible = true;
  public isClicked: boolean;
  MOBILE_PATTERN = /^[1-9]{1}[0-9]{9}$/;
  PINCODE_PATTERN = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  ADDRESS_PATTERN = /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./;
  NAME_PATTERN = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  CITY_PATTERN = /([A-Z][a-z]+\s?)+,\s[A-Z]{2}\s\d{5}-?\d{4}?/;

 nameFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this.NAME_PATTERN),
 ]);
 numberFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this. MOBILE_PATTERN ),
 ]);
 AddressFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this.ADDRESS_PATTERN),
 ]);
 PincodeFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this. PINCODE_PATTERN),
 ]);
 LocalityFormControl = new FormControl('', [
   Validators.required,
 ]);
 CityFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this.CITY_PATTERN)
 ]);
 LandmarkFormControl = new FormControl('', [
   Validators.required,
 ]);
 matcher = new MyErrorStateMatcher();
 constructor() { }

 ngOnInit(): void {
    this.isClicked = false;
 }

}
