import { NgModule } from '@angular/core';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MenuComponent } from './components/inventory/menu/menu.component';
import { IngerdientComponent } from './components/inventory/ingerdient/ingerdient.component';
import { EditMenuComponent } from './components/inventory/edit/edit.component';
import { AddMenuComponent } from './components/inventory/add/add.component';
import { CategoryComponent } from './components/inventory/category/category.component';
import { CartComponent } from './components/order/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ModalComponent } from './components/modal/modal.component';
import { BottomRightWordComponent } from './components/bottom-right-word/bottom-right-word.component';
import { ImageDirective } from './directives/validate/image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    InventoryComponent,
    MenuComponent,
    IngerdientComponent,
    OrderComponent,
    EditMenuComponent,
    AddMenuComponent,
    CategoryComponent,
    CartComponent,
    PaymentComponent,
    ModalComponent,
    BottomRightWordComponent,
    ImageDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
