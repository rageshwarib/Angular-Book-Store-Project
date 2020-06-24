import { Component, OnInit, Input, Output, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';
import { DomSanitizer } from '@angular/platform-browser';

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
 books : any;
 userId = 1;
 imageUrl: string;
 constructor( public httpService: HttpService, public sanitizer: DomSanitizer) { }

 ngOnInit(): void {
   this.isClicked = false;
   this.getBooksFromCart(this.userId);
  // this.getImageUrl(book);
 }
//  ngAfterViewInit() {
//   // this.book = this.Books.bookArray;
//   // this.message = this.child.message

// }
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
 getBooksFromCart(userId){
   this.httpService.getBooksFromCart(userId).subscribe(data => {
     this.books = data;
     this.userId = userId;
     console.log('Data in get card', data);
   });
   console.log(userId);
 }
  removeFromCart(book){
    var cartObj = new Cart(this.userId, book.id, 1);
    this.httpService.removeFromcart(cartObj).subscribe(data => {
     this.getBooksFromCart(this.userId);
    });
    console.log('Book removed from cart');
  }
}
