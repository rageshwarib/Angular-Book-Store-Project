import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AddToWishlistService {
  badgeCounter;
  wishlistBook = new BehaviorSubject([]);
  wishlistBookObservable = this.wishlistBook.asObservable();
  count = new BehaviorSubject(this.badgeCounter);
  countObservable = this.count.asObservable();
  
  constructor(private httpService: HttpService) {
    this.getwishlistBook();
  }

  incrementWishlistCnt(length) {
    console.log("Length : ", length);
    this.count.next(length);
}
getwishlistBook(){
  this.httpService.getAllBooks('/home/wishlist/get-all').subscribe(data => {
  this.wishlistBook.next(data);
  this.incrementWishlistCnt(data.length);
});
}
}
