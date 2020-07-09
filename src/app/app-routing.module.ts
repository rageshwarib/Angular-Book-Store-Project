import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetBookDetailsComponent } from './components/get-book-details/get-book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivateGuard } from './activate.guard';
import { InvalidUrlComponent } from './components/invalid-url/invalid-url.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [{path: '', component: GetBookDetailsComponent},
    {path: 'cart', component: CartComponent, canActivate: [ActivateGuard]},
    {path: 'success', component: PlaceOrderComponent, canActivate: [ActivateGuard]},
     {path: 'wishlist', component: WishlistComponent, canActivate: [ActivateGuard]}
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'password', component: ForgetPasswordComponent
  },
  {
    path: 'resetpassword', component: ResetPasswordComponent
  },
  {
    path: '**', component: InvalidUrlComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
