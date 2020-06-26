import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerDetails } from '../model/customer-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  bookUrl = environment.baseUrl;
  cartUrl = environment.cartUrl;
  wishlistUrl = environment.wishlistUrl;
  customerUrl = environment.customerUrl;
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
    return this.http.post(this.wishlistUrl + '/add-to-wishlist', wishlistObj, this.header);
  }
  removeFromWishlist(wishlistObj): any{
    return this.http.post(this.wishlistUrl + '/remove-from-wishlist', wishlistObj, this.header);
  }
  getBooksFromWishlist(): any{
    return this.http.get<string[]>(this.wishlistUrl + '/get-all', this.header);
  }
  customerDetails(customerDetailObj): any{
    return this.http.post(this.customerUrl + '/add-details', customerDetailObj, this.header);
  }
  isCustomerExist(){
    return this.http.get(this.customerUrl + '/isexisted', this.header);
  }
  getOrderId(){
    return this.http.get(this.cartUrl + '/order-placed', this.header);
  }

}
