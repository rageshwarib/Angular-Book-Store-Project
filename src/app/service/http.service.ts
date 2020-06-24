import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  bookUrl = environment.baseUrl;
  cartUrl = environment.cartUrl;
  wishlistUrl = environment.wishlistUrl;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<string[]>{
    return this.http.get<string[]>(this.bookUrl + '/home');
  }
  sortByPriceAsc(): any{
    return this.http.get(this.bookUrl + '/sort/price-ascending');
  }
  sortByPriceDesc(): any{
    return this.http.get<string[]>(this.bookUrl + '/sort/price-descending');
  }
  sortByNewArrival(): any{
    return this.http.get<string[]>(this.bookUrl + '/sort/newest-arrival');
  }
  addToCart(cartObj): any{
    return this.http.put(this.cartUrl + '/add-to-cart', cartObj, {responseType: 'text'});
  }
  removeFromcart(cartObj): any{
    return this.http.put(this.cartUrl + '/remove-from-cart', cartObj, {responseType: 'text'});
  }
  getBooksFromCart(userId): any{
    return this.http.get<string[]>(this.cartUrl + '/getall/' + userId);
  }
  addToWishlist(wishlistObj): any{
    return this.http.post(this.wishlistUrl + '/add-to-wishlist', wishlistObj, {responseType: 'text'});
  }
  removeFromWishlist(wishlistObj): any{
    return this.http.post(this.wishlistUrl + '/remove-from-wishlist', wishlistObj, {responseType: 'text'});
  }
  getBooksFromWishlist(userId): any{
    return this.http.get<string[]>(this.wishlistUrl + '/getall/' + userId);
  }

}
