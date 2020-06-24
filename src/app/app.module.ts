import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportModule } from 'src/import.module';

import { GetBookDetailsComponent } from './components/get-book-details/get-book-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';

import { BookcartComponent } from './components/bookcart/bookcart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookcartComponent,
    GetBookDetailsComponent,
    CartComponent,
    FormComponent,
    OrderSummeryComponent,
    PlaceOrderComponent,
    BookcartComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImportModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [BookcartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
