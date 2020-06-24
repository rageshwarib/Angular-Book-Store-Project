import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Wishlist } from 'src/app/model/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books = [];
  userId = 5;
 // public cartObj = new Wishlist(1, 101);
  constructor( public httpService: HttpService ) { }

  ngOnInit(): void {
    this.getBooksFromWishlist(this.userId);
  }
  getBooksFromWishlist(userId){
    this.httpService.getBooksFromWishlist(userId).subscribe(data => {
      this.books = data;
      this.userId = userId;
      console.log('Data get in wishlist', data);
    });
    console.log(userId);
  }
  removeFromWishlist(book){
    var wishlistObj = new Wishlist(this.userId, book.id);
    this.httpService.removeFromWishlist(wishlistObj).subscribe(data => {
     // this.userId = userId
     this.getBooksFromWishlist(this.userId);
    });
    console.log('Book removed from Wishlist');
  }
}
