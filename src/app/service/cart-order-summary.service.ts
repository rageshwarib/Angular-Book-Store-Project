import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartOrderSummaryService {
books: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderSummaryBooks = this.books.asObservable();
  constructor(public httpService: HttpService) { }

  getBooksFromCart(bookList){
    this.books.next(bookList);
   }
}
