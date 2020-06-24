import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetBookDetailsComponent } from './components/get-book-details/get-book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './components/form/form.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { BookcartComponent } from './components/bookcart/bookcart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [{path: '', component: GetBookDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'success', component: PlaceOrderComponent},
     {path: 'login', component: LoginComponent},
     {path: 'signup', component: SignupComponent},
     {path: 'password', component: ForgetPasswordComponent},
     {path: 'wishlist', component: WishlistComponent}
    ]
  },
 // {
  //  path: 'cart', component: CartComponent,
    // children: [{path: 'cart', component: FormComponent,
    // children: [{path: 'cart', component: OrderSummeryComponent}] }]
  // },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'password', component: ForgetPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
