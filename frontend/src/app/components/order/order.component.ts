import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { menuType } from '../../interfaces/menu.model';
import { categoryType } from '../../interfaces/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'], // Fixed styleUrl to styleUrls
})
export class OrderComponent implements OnInit {
  cart: menuType[] = [];
  menu: menuType[] = [];
  filters: categoryType[] = [];
  currentFilter: string = 'All';
  message: string = '';

  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
  ) {
    // Fetching cart from service
    this.cart = this.orderService.getCart();

    // Fetching and sorting menu
    this.orderService.getAllMenu().subscribe((result) => {
      this.menu = result.sort((a: menuType, b: menuType) =>
        a.name.localeCompare(b.name)
      );
    });

    // Fetching and sorting categories
    this.categoryService.getAllCategory().subscribe((result) => {
      this.filters = result.sort((a: categoryType, b: categoryType) =>
        a.categoryName.localeCompare(b.categoryName)
      );
    });
  }

  ngOnInit(): void {
    
  }

  // Method to get cart counter
  getCounter() {
    return this.orderService.getCounter();
  }

  // Method to add a menu item to cart
  addToCart(menuID: number) {
    this.orderService.add(menuID);
  }

  // Method to get total sum price of items in cart
  getSumPrice() {
    return this.orderService.getSumPrice();
  }

  // Method to filter menu items by category
  filterMenu(category: categoryType) {
    this.currentFilter = category.categoryName;
  }

  // Method to reset filters and show all items
  filterAll() {
    this.currentFilter = 'All';
  }

  // Helper method to determine visibility of menu items
  isItemVisible(category: string) {
    return this.currentFilter === 'All' || category === this.currentFilter;
  }

  // Method to update the cart when items are added or removed
  onCartUpdate(updatedCart: menuType[]) {
    this.cart = updatedCart;
    this.orderService.getCart();
  }

  // Method to get a specific menu item by its ID
  getsomeMenu(id: string) {
    return this.menu.find((item) => item._id === id);
  }
}
