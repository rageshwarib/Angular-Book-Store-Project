import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToWishlistService {
  badgeCounter = 1;
  count: BehaviorSubject<number>;
  constructor() {
    this.count = new BehaviorSubject(this.badgeCounter);
  }
  incrementWishlistCnt() {
   return this.count.next(this.badgeCounter++);
}
}
