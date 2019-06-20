import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { HomeComponent } from './component/home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SwiperModule } from 'angular2-useful-swiper';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './component/header/header.component';
import { PromoComponent } from './component/promo/promo.component';
import { BannerComponent } from './component/banner/banner.component';
import { SupportComponent } from './component/support/support.component';
import { AccountComponent } from './component/account/account.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { HelpComponent } from './component/help/help.component';
import { InstructionsComponent } from './component/instructions/instructions.component';
import { FeaturedProductComponent } from './component/featured-product/featured-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu2Component } from './component/menu2/menu2.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './component/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { LoginService } from './service/login.service';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { AllcategoriesComponent } from './component/allcategories/allcategories.component';
import { AdminService } from './service/admin.service';
import { UsersAdminComponent } from './component/admin/users-admin/users-admin.component';
import { ProductsAdminComponent } from './component/admin/products-admin/products-admin.component';
import { OrdersAdminComponent } from './component/admin/orders-admin/orders-admin.component';
import { CategoryAdminComponent } from './component/admin/category-admin/category-admin.component';
import { ContactAdminComponent } from './component/admin/contact-admin/contact-admin.component';
import { CategoryService } from './service/category.service';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';
import { OneProductDetailsComponent } from './component/one-product-details/one-product-details.component';
import { CartService } from './service/cart.service';
import { CartComponent } from './component/cart/cart.component';
import { OrderService } from './service/order.service';
import { SearchService } from './service/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './component/search/search.component';
import { MessageComponent } from './component/user/message/message.component';
import { UsersComponent } from './component/users/users.component';
import { MostSearchedComponent } from './component/most-searched/most-searched.component';
import { UserProductShowComponent } from './component/user-product-show/user-product-show.component';
import { MessageService } from './service/message.service';
import { AccountMessagesComponent } from './component/account-messages/account-messages.component';
import { AccountProductsComponent } from './component/account-products/account-products.component';
import { AccountManageProductsComponent } from './component/account-manage-products/account-manage-products.component';
import { AccountOrdersComponent } from './component/account-orders/account-orders.component';
import { ShippingAddressComponent } from './component/orders-admin/shipping-address/shipping-address.component';
import { OrdersDetailsComponent } from './component/orders-admin/orders-details/orders-details.component';
// import {GoTopButtonModule} from 'ng2-go-top-button';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    ContactusComponent,
    NotfoundComponent,
    HomeComponent,
    HeaderComponent,
    PromoComponent,
    BannerComponent,
    SupportComponent,
    UsersComponent,
    AccountComponent,
    WishlistComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HelpComponent,
    InstructionsComponent,
    FeaturedProductComponent,
    Menu2Component,
    CarouselComponent,
    SignupComponent,
    AllcategoriesComponent,
    UsersAdminComponent,
    ProductsAdminComponent,
    OrdersAdminComponent,
    CategoryAdminComponent,
    ContactAdminComponent,
    OrdersDetailsComponent,
    ProductsDetailsComponent,
    OneProductDetailsComponent,
    UserProductShowComponent,
    SearchComponent,
    MessageComponent,
    MostSearchedComponent,
    AccountMessagesComponent,
    AccountProductsComponent,
    AccountManageProductsComponent,
    AccountOrdersComponent,
    ShippingAddressComponent
  ],
  imports: [
    BrowserModule,
    Ng2DropdownModule,
    MatTreeModule,
    AppRoutingModule,
    NgImageSliderModule,
    SwiperModule,
    SlickCarouselModule,
    NgbModule,
    FormsModule,
    // GoTopButtonModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      easing: 'ease-in'
    }),
    ReactiveFormsModule,
    MatTabsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    UserService,
    CartService,
    LoginService,
    AuthGuard,
    AdminGuard,
    AdminService,
    CategoryService,
    OrderService,
    SearchService,
    MessageService ,
    UserProductShowComponent,
    NgbTabsetConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
