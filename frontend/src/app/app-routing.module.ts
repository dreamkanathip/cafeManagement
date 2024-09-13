import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { InventoryComponent } from './components/inventory/inventory.component';
import { IngerdientComponent } from './components/inventory/ingerdient/ingerdient.component';
import { MenuComponent } from './components/inventory/menu/menu.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventory', component: InventoryComponent},
  { path: 'manage-menu', component: MenuComponent },
  { path: 'manage-ingredient', component: IngerdientComponent},
 

  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'order', component: OrderComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
