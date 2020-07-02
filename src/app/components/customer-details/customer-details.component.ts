import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { CustomerDetails } from 'src/app/model/customer-details';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() form: any;
  myForm: FormGroup;
  public isButtonVisible = true;
  public isClicked: boolean;
  customerArray = [];
  public customerObj = new CustomerDetails();

  MOBILE_PATTERN = /^[1-9]{1}[0-9]{9}$/;
  PINCODE_PATTERN = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  NAME_PATTERN = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

  constructor(public httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isClicked = false;
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(this.NAME_PATTERN)]),
     // number: new FormControl(null, [Validators.required, Validators.pattern(this.MOBILE_PATTERN)]),
      address: new FormControl(null, Validators.required),
      pincode: new FormControl(null, [Validators.required, Validators.pattern(this.PINCODE_PATTERN)]),
      locality: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      landmark: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addDetails(){
    this.httpService.addCustomerDetails(this.customerObj).subscribe(data => {
      console.log(data);
    });
  }
}