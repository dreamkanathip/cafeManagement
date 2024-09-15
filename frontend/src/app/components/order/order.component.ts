import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { menuType } from '../../interfaces/menu.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  cart: menuType[] = []

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

  getsomeMenu(id: string){
    return this.menu.find(item => item._id === id)
  }

  //

  currentFilter = 'all';

  constructor(private orderService: OrderService) {
    this.cart = this.orderService.getCart()
  }

  ngOnInit(): void { }

  getCounter() {
    return this.orderService.getCounter();
  }

  addToCart(menuID: number) {
    this.orderService.add(menuID)
  }

  getSumPrice() {
    return this.orderService.getSumPrice()
  }

  filterMenu(category: string) {
    this.currentFilter = category.toLowerCase();
  }

  isItemVisible(category: string): boolean {
    return this.currentFilter === 'all' || category.toLowerCase() === this.currentFilter;
  }

}
