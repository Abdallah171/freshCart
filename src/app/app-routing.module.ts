import { authGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'checkout/:id', component: CheckoutComponent },
      { path: 'allorders', component: AllordersComponent },


    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },

    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
