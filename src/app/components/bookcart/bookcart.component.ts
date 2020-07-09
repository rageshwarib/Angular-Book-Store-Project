import { Component, OnInit, Input } from '@angular/core';
import { AddToBagService } from 'src/app/service/add-to-bag.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/service/http.service';
import { Cart } from 'src/app/model/cart';
import { Wishlist } from 'src/app/model/wishlist';
import { AddToWishlistService } from 'src/app/service/add-to-wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookcart',
  templateUrl: './bookcart.component.html',
  styleUrls: ['./bookcart.component.scss']
})
export class BookcartComponent implements OnInit {
  @Input() book: any;
  toggle: boolean;
  isDisabled: boolean;
  imageUrl: string;
  bookQuantity = 1 ;
  isevent = true;
  constructor(public addToBag: AddToBagService,
              public addToWish: AddToWishlistService,
              public sanitizer: DomSanitizer, public httpService: HttpService,
              private snackBar: MatSnackBar) { }

   ngOnInit(): void {
    this.imageUrl = this.book.image;
    this.getImageUrl();
  }
  Toggle() {
    this.toggle = true;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,

    });
 }
  getImageUrl() {
    if (this.imageUrl != null) {
      var firstReplacement = this.imageUrl.replace("'", '');
      return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
    }
  }
  incrementBagCnt() {
    this.addToBag.getCartBook();
    this.isDisabled = true;
  }
  incrementWishlistCnt() {
    this.addToWish.getwishlistBook();
    this.isDisabled = true;
  }

  addToCart(){
  var cartObj = new Cart(this.book.id, this.bookQuantity);
  this.httpService.postRequest(cartObj, '/home/cart/add-to-cart').subscribe(data => {
  });
  console.log('Book added to cart' );
  console.log(cartObj);
 }
 addToWishlist(){
  var cartObj = new Wishlist(this.book.id);
  this.httpService.postRequest(cartObj, '/home/wishlist/add-to-wishlist').subscribe(data => {
    // console.log('data in wishlist', data);
  });
  console.log('Book added to wishlist');
}
}
