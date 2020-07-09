import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerDetails } from '../model/customer-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
 // cartUrl = environment.cartUrl;
 // wishlistUrl = environment.wishlistUrl;
//  customerUrl = environment.customerUrl;
header = {headers: new HttpHeaders().set('token', localStorage.getItem('token'))}
  constructor(private http: HttpClient) { }

  getRequest(url): any{
    return this.http.get(this.baseUrl + url);
  }
  getAllBooks(url): any{
    return this.http.get<string[]>(this.baseUrl + url, this.header);
  }
  postRequest(cartObj, url): any{
    return this.http.post(this.baseUrl + url, cartObj, this.header);
  }

  // addCustomerDetails(customerObj): any{
  //    return this.http.post(this.baseUrl + '/customer-details/add-details', customerObj, this.header);
  // }
  // isCustomerExist(){
  //   return this.http.get(this.baseUrl + '/customer-details/isexisted', this.header);
  // }
  // getOrderId(){
  //   return this.http.get(this.baseUrl + '/home/cart/order-placed', this.header);
  // }

}
