import { Component, OnInit, Input } from '@angular/core';
import { CartOrderSummaryService } from 'src/app/service/cart-order-summary.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss']
})
export class OrderSummeryComponent implements OnInit {
  cartBooks = [];
  imageUrl: string;

   constructor(public cartOrderSummaryService: CartOrderSummaryService, public sanitizer: DomSanitizer) { }
  ngOnInit(): void {
   this.cartOrderSummaryService.orderSummaryBooks.subscribe(data => {
     this.cartBooks = data;
   });
 }
 getImageUrl(book) {
   this.imageUrl = book.image;
   if (this.imageUrl != null) {
     var firstReplacement = this.imageUrl.replace("'", '');
     return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
   }
  }

}
