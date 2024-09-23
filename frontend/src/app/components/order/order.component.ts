import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { menuType } from '../../interfaces/menu.model';
import { categoryType } from '../../interfaces/category.model';
import { CategoryService } from '../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emitters/emitter'; // Adjust the path as necessary

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
    private http: HttpClient // Inject HttpClient here
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
    // Fetch user details for personalized message
    this.http
      .get<any>('http://localhost:5000/api/user', { withCredentials: true })
      .subscribe(
        (res) => {
          const title =
            res.gender === 'male'
              ? 'Mr.'
              : res.gender === 'female'
              ? 'Ms.'
              : '';
          const firstLetterOfLastName = res.lastName
            ? res.lastName.charAt(0)
            : '';
          this.message = `${title} ${firstLetterOfLastName}. ${res.firstName}!`;
          Emitters.authEmitter.emit(true); // Emit authentication status
        },
        (err) => {
          console.error('Error fetching user data:', err);
          this.message = 'An error occurred. Please try again later.';
          Emitters.authEmitter.emit(false); // Emit error in case of failure
        }
      );
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
