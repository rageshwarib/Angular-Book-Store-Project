import { Component, OnInit, Input} from '@angular/core';
import { BookcartComponent } from '../components/bookcart/bookcart.component';
import { Router } from '@angular/router';
import { AddToBagService } from '../service/add-to-bag.service';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { HttpService } from '../service/http.service';
import { SearchKeyService } from '../service/search-key.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cartCount = 0;
  wishCount = 0;
  searchText;
 // @Input() book: any;
  constructor(private http: HttpService, public addToBagService: AddToBagService,
              public addToWishService: AddToWishlistService, public searchKeyService: SearchKeyService) { }
ngOnInit(): void {
  this.incrementBagCount();
  this.incrementWishlistCount();
 // this.SearchBooks(this.searchText);
  console.log(this.searchText);
 }
incrementBagCount(){
  this.addToBagService.getCartBook();
  this.addToBagService.countObservable.subscribe(counts =>{
    console.log(counts);
    this.cartCount = counts ;
  });
}

incrementWishlistCount(){
  this.addToWishService.getwishlistBook();
  this.addToWishService.countObservable.subscribe(counts =>{
    console.log(counts);
    this.wishCount = counts ;
  });
}
searchBooks(searchtext){
   console.log('Search text ', searchtext);
   this.searchKeyService.searchBook(searchtext);
}
}
