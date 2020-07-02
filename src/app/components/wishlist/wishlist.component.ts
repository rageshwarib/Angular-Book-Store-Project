import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Wishlist } from 'src/app/model/wishlist';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books = [];
  imageUrl: string;
  bookQuantity = 1;
  constructor( public httpService: HttpService,  public sanitizer: DomSanitizer, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBooksFromWishlist();
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
 
  getBooksFromWishlist() {
    this.httpService.getAllBooks('/home/wishlist/get-all/').subscribe(data => {
      this.books = data;
      // this.
      console.log('Data get in wishlist', data);
     });
  }
  removeFromWishList(book) {
    var cartObj = new Wishlist(book.id);
    this.httpService.postRequest(cartObj, '/home/wishlist/remove-from-wishlist').subscribe(data => {
      this.getBooksFromWishlist();
    });
    console.log('Book removed from Wishlist');
   }
   addToCart(book) {
    var cartObj = new Cart(book.id, this.bookQuantity);
    this.httpService.postRequest(cartObj, '/home/cart/add-to-cart').subscribe(data => {
    });
 }
}
