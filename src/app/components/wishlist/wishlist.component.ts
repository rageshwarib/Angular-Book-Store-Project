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
  constructor( public httpService: HttpService ) { }

  ngOnInit(): void {
    this.getBooksFromWishlist();
  }
  getBooksFromWishlist(){
    this.httpService.getBooksFromWishlist().subscribe(data => {
      this.books = data;
      console.log('Data get in wishlist', data);
    });
  }
  removeFromWishlist(book){
    var wishlistObj = new Wishlist(book.id);
    this.httpService.removeFromWishlist(wishlistObj).subscribe(data => {
     this.getBooksFromWishlist();
    });
    console.log('Book removed from Wishlist');
  }
}
