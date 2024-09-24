import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngerdientComponent } from './components/inventory/ingerdient/ingerdient.component';
import { MenuComponent } from './components/inventory/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { EditMenuComponent } from './components/inventory/edit/edit.component';
import { AddMenuComponent } from './components/inventory/add/add.component';
import { CategoryComponent } from './components/inventory/category/category.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent , canActivate: [AuthGuard]},
  { path: 'inventory/manage-menu', component: MenuComponent , canActivate: [AuthGuard]},
  { path: 'inventory/manage-menu/edit', component: EditMenuComponent , canActivate: [AuthGuard]},
  { path: 'inventory/manage-menu/add', component: AddMenuComponent , canActivate: [AuthGuard]},
  { path: 'inventory/manage-ingredient', component: IngerdientComponent , canActivate: [AuthGuard]},
  { path: 'inventory/manage-menu/addCategory', component: CategoryComponent , canActivate: [AuthGuard]},
  { path: 'order', component: OrderComponent , canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
