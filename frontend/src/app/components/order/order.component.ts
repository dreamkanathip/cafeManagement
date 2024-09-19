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
      this.menu = result.sort((a: menuType, b: menuType) => a.name.localeCompare(b.name)); // Sorted
    })
    this.categoryService.getAllCategory().subscribe(result => {
      this.filters = result.sort((a: categoryType, b: categoryType) => a.categoryName.localeCompare(b.categoryName)); // Sorted
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

  onCartUpdate(updatedCart: menuType[]) {
    this.cart = updatedCart;
    this.orderService.getCart()
  }

}