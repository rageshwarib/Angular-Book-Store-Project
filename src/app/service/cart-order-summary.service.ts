import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartOrderSummaryService {
  price: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderSummaryPrice = this.price.asObservable();

  quantity: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderSummaryQuantity = this.quantity.asObservable();

  books: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderSummaryBooks = this.books.asObservable();
  constructor(public httpService: HttpService) { }

  getBooksFromCart(bookList){
    this.books.next(bookList);
   }
   getTotalPrice(price) {
    this.price.next(price);
  }
  getTotalQuantity(quantity) {
    this.quantity.next(quantity);
  }
}
