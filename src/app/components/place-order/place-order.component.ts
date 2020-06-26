import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

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
getOrderId(){
  this.httService.getOrderId().subscribe(data => {
  this.orderId = data;
  });
  
}
}
