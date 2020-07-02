import { Component, OnInit, Input, Output, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { CartOrderSummaryService } from 'src/app/service/cart-order-summary.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  bookQuantity;
  isExist;
  total;
 constructor( public cartOrderSummaryService: CartOrderSummaryService, public httpService: HttpService, 
              public sanitizer: DomSanitizer, private snackBar: MatSnackBar) { }

 ngOnInit(): void {
  this.isClicked = false;
  this.getBooksFromCart();
}

openSnackBar(message: string, action: string) {
   this.snackBar.open(message, action, {
      duration: 2000,
   });
}
getImageUrl(book) {
  this.imageUrl = book.image;
  if (this.imageUrl != null) {
    var firstReplacement = this.imageUrl.replace("'", '');
    return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
  }
}
addItem(id){
  console.log(id);
  // tslint:disable-next-line: prefer-for-of
  for ( let i = 0; i < this.books.length; i++){
    if (this.books[i].id === id && this.books[i].bookQuantity < 10)
    {
      this.books[i].bookQuantity += 1;
    }
  }
  this.totalPrice();
  console.log(this.books);
}

removeItem(id){
  console.log(id);
  // tslint:disable-next-line: prefer-for-of
  for ( let i = 0; i < this.books.length; i++){
   if (this.books[i].id === id && this.books[i].bookQuantity > 0)
   {
     this.books[i].bookQuantity -= 1;
   }
 }
  this.totalPrice();
  console.log(this.books);
}
totalPrice(){
  this.total = 0;
   // tslint:disable-next-line: prefer-for-of
  for (var i = 0; i < this.books.length; i++){
    this.total += (this.books[i].price * this.books[i].bookQuantity);
  }
}
getBooksFromCart(){
  this.httpService.getAllBooks('/home/cart/getall/').subscribe(data => {
    this.books = data;

    this.cartOrderSummaryService.getBooksFromCart(this.books);
    console.log('Data in get card', data);
  });
}

removeFromCart(book){
  var cartObj = new Cart(book.id, this.bookQuantity);
  this.httpService.postRequest(cartObj, '/home/cart/remove-from-cart').subscribe(data => {
   this.getBooksFromCart();
  });
 }

isCustomerExist(){
  // if ( this.isExist === true){
  this.httpService.isCustomerExist().subscribe(data => {
    this.isExist = data;
   // console.log(data);
  });
}
}
