import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToBagService {
  badgeCounter = 1;
  count: BehaviorSubject<number>;
  constructor() {
    this.count = new BehaviorSubject(this.badgeCounter);
  }

  incrementBagCnt() {
   return this.count.next(this.badgeCounter++);
}

}

