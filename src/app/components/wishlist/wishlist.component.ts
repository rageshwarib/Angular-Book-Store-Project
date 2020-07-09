import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Wishlist } from 'src/app/model/wishlist';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/model/cart';
import { Router } from '@angular/router';
import { AddToBagService } from 'src/app/service/add-to-bag.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books = [];
  userId = 1;
  bookQuantity = 1;
  imageUrl: string;
  loading = true;
  constructor( public httpService: HttpService,  public sanitizer: DomSanitizer, private snackBar: MatSnackBar,
               public addToBagService: AddToBagService, private router: Router) { }

  ngOnInit() {
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
      var firstReplacement = this.imageUrl.replace("'", '');
      return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
    }
  }
  logincheck() {
    let key = localStorage.getItem('token');
    console.log('generated key ', key);
    if (key === null) {
      alert('you dont have permission to view this page, go to login');
      this.router.navigate(['login']);
    }
    else {
      this.getBooksFromWishlist(this.userId);
    }
  }
  getBooksFromWishlist(userId) {
    this.loading = true;
    this.httpService.getAllBooks('/home/wishlist/get-all/').subscribe(data => {
      this.books = data;
      this.loading = false;
      this.userId = userId;
    });
  }
  removeFromWishList(book) {
    this.loading = true;
    var cartObj = new Wishlist(book.id);
    this.httpService.postRequest(cartObj, '/home/wishlist/remove-from-wishlist').subscribe(data => {
      this.loading = false;
      this.getBooksFromWishlist(this.userId);
    });
  }
  addToCart(book) {
    this.loading = true;
    var cartObj = new Cart(book.id, this.bookQuantity);
    this.httpService.postRequest(cartObj, '/home/cart/add-to-cart').subscribe(data => {
      this.loading = false;
    });
  }
  incrementBagCnt() {
    this.addToBagService.getCartBook();
  }
}