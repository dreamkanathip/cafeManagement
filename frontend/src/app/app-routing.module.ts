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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/manage-menu', component: MenuComponent },
  { path: 'inventory/manage-menu/edit', component: EditMenuComponent },
  { path: 'inventory/manage-menu/add', component: AddMenuComponent },
  { path: 'inventory/manage-ingredient', component: IngerdientComponent },
  { path: 'order', component: OrderComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
