import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { menuType } from '../../../interfaces/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: menuType[] = []

  @Output() cartUpdate = new EventEmitter<menuType[]>();


  constructor(private orderService: OrderService, private router: Router) {
    this.cart = this.orderService.getCart()
  }

  getSumPrice() {
    return this.orderService.getSumPrice()
  }

  deleteCart(i: number){
    this.cart.splice(i, 1)
    this.cartUpdate.emit(this.cart);
    this.orderService.updateCart(this.cart);
  }
  submitCart() {
    this.router.navigate(['/payment']); // Adjust the route path as needed
  }
}
