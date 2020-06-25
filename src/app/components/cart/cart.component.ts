import { Component, OnInit, Input, Output, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { CartOrderSummaryService } from 'src/app/service/cart-order-summary.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
// @ViewChild(GetBookDetailsComponent) Books;
// @Input() book: any;
//book = []
 public isClicked: boolean;
 public isButtonVisible = true;
 public amount: number;
 books: any;
 imageUrl: string;
 constructor( public cartOrderSummaryService: CartOrderSummaryService, public httpService: HttpService, public sanitizer: DomSanitizer) { }

 ngOnInit(): void {
   this.isClicked = false;
   this.getBooksFromCart();
  // this.getImageUrl(book);
 }
 add() {
   this.amount = 1;
 }
 addToCart() {
   this.amount = 1;
 }

 deleteItem(){
   this.amount = this.amount * 0;
 }
 addItem() {
   this.amount = this.amount + 1;
 }

 removeItem() {
   if (this.amount > 0) {
     this.amount = this.amount - 1;
   }
   else {
     this.amount = this.amount;
   }
 }
 getImageUrl(book) {
  this.imageUrl = book.image;
  if (this.imageUrl != null) {
    var firstReplacement = this.imageUrl.replace("'", '');
    return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
  }
}
getBooksFromCart(){
  this.httpService.getBooksFromCart().subscribe(data => {
    this.books = data;
   this.cartOrderSummaryService.getBooksFromCart(this.books);
    console.log('Data  get in card', data);
  });
}

removeFromCart(book){
  var cartObj = new Cart(book.id, 1);
  console.log(cartObj);
  this.httpService.removeFromcart(cartObj).subscribe(data => {
  this.getBooksFromCart();
  });
  console.log('Book removed from cart');
}

//  getBooksFromCart(){
//    this.httpService.getBooksFromCart().subscribe(data => {
//      this.books = data;
//     // this.userId = userId;
//      console.log('Data in get card', data);
//    });
//    //console.log(this.header);
//  }
//   removeFromCart(book){
//     var cartObj = new Cart(book.id, 1);
//     this.httpService.removeFromcart(cartObj).subscribe(data => {
//      this.getBooksFromCart();
//     });
//     console.log('Book removed from cart');
//   }
}
