import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  bookUrl = environment.baseUrl;
  cartUrl = environment.cartUrl;
  wishlistUrl = environment.wishlistUrl;
header = {headers: new HttpHeaders().set('token', localStorage.getItem('token'))}
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
    return this.http.post(this.cartUrl + '/add-to-cart', cartObj, this.header);
  }
  getBooksFromCart(): any{
    return this.http.get<string[]>(this.cartUrl + '/getall', this.header);
  }
  removeFromcart(cartObj): any{
    return this.http.post(this.cartUrl + '/remove-from-cart', cartObj, this.header);
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
