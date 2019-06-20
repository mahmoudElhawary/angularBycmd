import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { UserComponent } from './component/user/user.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { AdminComponent } from './component/admin/admin.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { AccountComponent } from './component/account/account.component';
import { BannerComponent } from './component/banner/banner.component';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { PromoComponent } from './component/promo/promo.component';
import { SupportComponent } from './component/support/support.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { HelpComponent } from './component/help/help.component';
import { InstructionsComponent } from './component/instructions/instructions.component';
import { FeaturedProductComponent } from './component/featured-product/featured-product.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { AllcategoriesComponent } from './component/allcategories/allcategories.component';
import { OrdersAdminComponent } from './component/admin/orders-admin/orders-admin.component';
import { CategoryAdminComponent } from './component/admin/category-admin/category-admin.component';
import { ContactAdminComponent } from './component/admin/contact-admin/contact-admin.component';
import { UsersAdminComponent } from './component/admin/users-admin/users-admin.component';
import { ProductsAdminComponent } from './component/admin/products-admin/products-admin.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';
import { OneProductDetailsComponent } from './component/one-product-details/one-product-details.component';
import { UsersComponent } from './component/users/users.component';
import { UserProductShowComponent } from './component/user-product-show/user-product-show.component';
import { SearchComponent } from './component/search/search.component';
import { MessageComponent } from './component/user/message/message.component';
import { ShippingAddressComponent } from './component/orders-admin/shipping-address/shipping-address.component';
import { OrdersDetailsComponent } from './component/orders-admin/orders-details/orders-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'signup', component: SignupComponent } ,
  { path: 'allCategories', component: AllcategoriesComponent } ,
  { path: 'account', component: AccountComponent , canActivate: [AuthGuard]} ,
  { path: 'account/products', component: AccountComponent , canActivate: [AuthGuard]} ,
  { path: 'account/messages', component: AccountComponent , canActivate: [AuthGuard]} ,
  { path: 'account/manage/Products', component: AccountComponent , canActivate: [AuthGuard]} ,
  { path: 'account/orders', component: AccountComponent , canActivate: [AuthGuard]} ,
  { path: 'banner', component: BannerComponent } ,
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard]} ,
  { path: 'search/:searchValue', component: SearchComponent } ,
  { path: 'users/:id', component: UserComponent , canActivate: [AuthGuard]} ,
  { path: 'sendmessage/:id' , component: MessageComponent , canActivate: [AuthGuard]} ,
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard]} ,
  { path: 'header', component: HeaderComponent } ,
  { path: 'featured-product', component: FeaturedProductComponent } ,
  { path: 'products/:categoryName', component: ProductsDetailsComponent } ,
  { path: 'products', component: ProductsComponent } ,
  { path: 'product/:id', component: OneProductDetailsComponent } ,
  { path: 'userProduct/:id', component: UserProductShowComponent } ,
  { path: 'searchedProducts/:searchValue', component: ProductDetailsComponent } ,
  { path: 'promo', component: PromoComponent } ,
  { path: 'support', component: SupportComponent } ,
  { path: 'wishlist', component: WishlistComponent } ,
  { path: 'footer', component: FooterComponent } ,
  { path: 'adminpage', component: AdminComponent , canActivate: [AuthGuard] } ,
  { path: 'adminpage/:id', component: AdminComponent , canActivate: [AuthGuard] , children : [
    { path: 'orders-admin', component: OrdersAdminComponent } ,
    { path: 'products-admin', component: ProductsAdminComponent } ,
    { path: 'users-admin', component: UsersAdminComponent } ,
    { path: 'contact-admin', component: ContactAdminComponent } ,
    { path: 'category-admin', component: CategoryAdminComponent } ,
  ]} ,
  { path: 'adminpage/users-admin/orders-admin/admin/orders/details/:id', component: OrdersDetailsComponent } ,
  { path: 'adminpage/users-admin/orders-admin/admin/orders/Address/:id', component: ShippingAddressComponent } ,
  { path: 'contactusPage', component: ContactusComponent } ,
  { path: 'user', component: UserComponent , canActivate: [AuthGuard]} ,
  { path: 'help', component: HelpComponent } ,
  { path: 'instructions', component: InstructionsComponent } ,
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
