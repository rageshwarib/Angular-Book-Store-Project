import { Component, OnInit, Input } from '@angular/core';
import { CartOrderSummaryService } from 'src/app/service/cart-order-summary.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss']
})
export class OrderSummeryComponent implements OnInit {
  cartBooks = [];
  imageUrl: string;
  totalPrice = [];
  totalQuantity = [];

   constructor(public cartOrderSummaryService: CartOrderSummaryService, public sanitizer: DomSanitizer,
                private snackBar: MatSnackBar) { }
   ngOnInit(){
    this.cartOrderSummaryService.orderSummaryBooks.subscribe(data => {
      this.cartBooks = data;
    });
    this. getTotalPrice();
    this.getTotalQuantity();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getImageUrl(book) {
    this.imageUrl = book.image;
    if (this.imageUrl != null) {
      var firstReplacement = this.imageUrl.replace("'", '');
      return this.sanitizer.bypassSecurityTrustUrl(firstReplacement.replace("'", ''));
    }
  }
  getTotalPrice() {
    this.cartOrderSummaryService.orderSummaryPrice.subscribe(data => {
      this.totalPrice = data;
    });
  }
  getTotalQuantity() {
    this.cartOrderSummaryService.orderSummaryQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
  }
}