import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AddToBagService {
  badgeCounter = 1;
  bagBook = new BehaviorSubject([]);
  bagBookObservable = this.bagBook.asObservable();
  count = new BehaviorSubject(this.badgeCounter);
  countObservable = this.count.asObservable();
  
  constructor(private httpService: HttpService) {
    this.getCartBook();
  }

  incrementBagCnt(length) {
    console.log("Length : ", length);
    this.count.next(length);
}
getCartBook(){
  this.httpService.getAllBooks('/home/cart/getall').subscribe(data => {
  this.bagBook.next(data);
  this.incrementBagCnt(data.length);
});
}
}
