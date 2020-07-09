import { Component, OnInit, Input, Output, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { CartOrderSummaryService } from 'src/app/service/cart-order-summary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  public isClicked: boolean;
  public isButtonVisible = true;
  public amount: number;
  imageUrl: string;
  books = [];
  userId = 1;
  bookQuantity = 1;
  isExist;
  total;
  loading = true;
  totalQuantity ;
 constructor( public cartOrderSummaryService: CartOrderSummaryService, public httpService: HttpService, 
              public sanitizer: DomSanitizer, private snackBar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.isClicked = false;
    this.logincheck();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getImageUrl(book) {
    this.imageUrl = book.image;
    if (this.imageUrl != null) {
      const firstReplacement = this.imageUrl.replace('\'', '');
      return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace('\'', ''));
    }
  }

  addItem(id) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id && this.books[i].bookQuantity < 10) {
        this.books[i].bookQuantity += 1;
      }
    }
    this.totalPrice();
  }

  removeItem(id) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id && this.books[i].bookQuantity > 0) {
        this.books[i].bookQuantity -= 1;
      }
    }
    this.totalPrice();
  }
  totalPrice() {
    this.total = 0;
    this.totalQuantity = 0;
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < this.books.length; i++) {
      this.total += (this.books[i].price * this.books[i].bookQuantity);
      this.totalQuantity +=  this.books[i].bookQuantity;
      console.log("total quantity here", this.totalQuantity );
    }
    this.cartOrderSummaryService.getTotalPrice(this.total);
    this.cartOrderSummaryService.getTotalQuantity(this.totalQuantity);
  }

  logincheck() {
    let key = localStorage.getItem('token');
    console.log('generated key ', key);
    if (key === null) {
       alert('you dont have permission to view this page, go to login');
       this.router.navigate(['login']);
    }
    else {
      this.getBooksFromCart();
    }
  }
  getBooksFromCart() {
    this.loading = true;
    this.httpService.getAllBooks('/home/cart/getall/').subscribe(data => {
      this.books = data;
      this.loading = false;
      this.cartOrderSummaryService.getBooksFromCart(this.books);
    });
  }
  removeFromCart(book) {
    this.loading = true;
    const cartObj = new Cart(book.id, this.bookQuantity);
    this.httpService.postRequest(cartObj, '/home/cart/remove-from-cart').subscribe(data => {
      this.loading = false;
      this.getBooksFromCart();
    });
  }

  isCustomerExist() {
    this.loading = true;
    this.httpService.getAllBooks('/customer-details/isexisted').subscribe(data => {
      this.loading = false;
      this.isExist = data;
    });
  }
}