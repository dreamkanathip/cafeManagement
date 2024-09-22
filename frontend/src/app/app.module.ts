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
import { EditCategoryComponent } from './components/inventory/category/edit/edit.component';
import { ValidateDirective } from './directive/validate.directive';

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
    EditCategoryComponent,
    ValidateDirective,
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
