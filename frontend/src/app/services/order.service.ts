import { Injectable } from '@angular/core';
import { menuType } from '../interfaces/menu.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // fix Filter และ Menu

  filters = ['All', 'Drinks', 'Desserts', 'Others'];

  menu: menuType[] = [
    { "_id": "1", "name": "Latte", "price": 60, "category": "Drinks", "description": "", "image":"" },
    { "_id": "2", "name": "Mocha", "price": 60, "category": "Drinks", "description": "", "image":"" },
    { "_id": "3", "name": "Cappuccino", "price": 60, "category": "Drinks", "description": "", "image":"" },
    { "_id": "4", "name": "Espresso", "price": 60, "category": "Drinks", "description": "", "image":"" },
    { "_id": "5", "name": "Vanilla Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
    { "_id": "6", "name": "Mocha Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
    { "_id": "7", "name": "Cocoa Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
    { "_id": "8", "name": "Other", "price": 60, "category": "Others", "description": "", "image":"" },
  ]

  cartCounter: number = 0
  sumPrice: number = 0
  cart: menuType[] = []

  constructor(private menuService: MenuService) {}

  add(menuID: number) {
    console.log('Add product to cart');
    
    // this.menuService.getSomeMenu(menuID).subscribe(menuItem => {
    //   this.cart.push(menuItem);
    //   this.sumPrice += menuItem.price
    //   this.cartCounter += 1;
    //   console.log(`Menu item added to cart: ${menuItem}`);
    // }, error => {
    //   console.error('Error adding menu item to cart:', error);
    // });

    this.cart.push(this.menu[menuID])
    this.sumPrice += this.menu[menuID].price
    this.cartCounter += 1;
  }

  getCounter(){
    return this.cartCounter
  }

  getSumPrice(){
    return this.sumPrice
  }

  getCart() {
    return this.cart
  }

}
