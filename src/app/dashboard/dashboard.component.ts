import { Component, OnInit, Input} from '@angular/core';
import { AddToBagService } from '../service/add-to-bag.service';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { HttpService } from '../service/http.service';
import { SearchKeyService } from '../service/search-key.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('2000ms ease-out')),
      transition('default => rotated', animate('2000ms ease-in'))
    ]),
  ]
})

export class DashboardComponent implements OnInit {
  cartCount;
  wishCount;
  searchText;
  isLogIn: boolean;
  state: string = 'default';
  stateup: string = 'default';
  constructor(private http: HttpService, public addToBagService: AddToBagService,
              public addToWishService: AddToWishlistService, public searchKeyService: SearchKeyService) { }
 ngOnInit(): void {
    this.incrementBagCount();
    this.incrementWishlistCount();
    this.logincheck();
    // this.SearchBooks(this.searchText);//console.log(this.searchText);
  }

  logincheck() {
    let key = localStorage.getItem('token');
    if (key === null) {
      this.isLogIn = false;
    }
    else {
      this.isLogIn = true;
    }
  }
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  rotateup() {
    this.stateup = (this.stateup === 'default' ? 'rotated' : 'default');
}

  incrementBagCount() {
    this.addToBagService.getCartBook();
    this.addToBagService.countObservable.subscribe(counts => {
      this.cartCount = counts;
    });
  }

  incrementWishlistCount() {
    this.addToWishService.getwishlistBook();
    this.addToWishService.count.subscribe(counts => {
      this.wishCount = counts;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLogIn = false;
  }
searchBooks(searchtext){
   console.log('Search text ', searchtext);
   this.searchKeyService.searchBook(searchtext);
}
}
