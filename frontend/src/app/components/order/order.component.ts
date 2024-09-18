import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { menuType } from '../../interfaces/menu.model';
import { categoryType } from '../../interfaces/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  cart: menuType[] = []

  // fix Filter และ Menu

  // filters = ['All', 'Drinks', 'Desserts', 'Others'];

  // menu: menuType[] = [
  //   { "_id": "1", "name": "Latte", "price": 60, "category": "Drinks", "description": "", "image":"" },
  //   { "_id": "2", "name": "Mocha", "price": 60, "category": "Drinks", "description": "", "image":"" },
  //   { "_id": "3", "name": "Cappuccino", "price": 60, "category": "Drinks", "description": "", "image":"" },
  //   { "_id": "4", "name": "Espresso", "price": 60, "category": "Drinks", "description": "", "image":"" },
  //   { "_id": "5", "name": "Vanilla Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
  //   { "_id": "6", "name": "Mocha Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
  //   { "_id": "7", "name": "Cocoa Cake", "price": 60, "category": "Desserts", "description": "", "image":"" },
  //   { "_id": "8", "name": "Other", "price": 60, "category": "Others", "description": "", "image":"" },
  // ]

  menu: menuType[] =[]

  filters : categoryType[] = []

  getsomeMenu(id: string){
    return this.menu.find(item => item._id === id)
  }

  //

  currentFilter: string = 'All';

  constructor(private orderService: OrderService, private categoryService: CategoryService) {
    this.cart = this.orderService.getCart()
    this.orderService.getAllMenu().subscribe(result => {
      this.menu = result
    })
    this.categoryService.getAllCategory().subscribe(result => {
      this.filters = result;
      console.log('Categories received.')
    })
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

  filterMenu(category: categoryType) {
    this.currentFilter = category.categoryName;
  }

   // Method to reset and show all items
   filterAll() {
    this.currentFilter = 'All';
  }

  // Helper method to determine visibility of an item
  isItemVisible(category: string) {
    if (this.currentFilter === 'All') {
      return true;
    }
    return category === this.currentFilter;
  }

}