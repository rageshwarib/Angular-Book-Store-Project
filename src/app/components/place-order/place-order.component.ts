import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079 },
];
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  orderId;
  constructor(private httService: HttpService) { }
  ngOnInit(): void {
    this.getOrderId();
  }

  getOrderId() {
    this.httService.getAllBooks('/home/cart/order-placed').subscribe(data => {
      this.orderId = data;
    });
  }
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
}
