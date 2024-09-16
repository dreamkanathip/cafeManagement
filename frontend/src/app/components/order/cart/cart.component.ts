import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { menuType } from '../../../interfaces/menu.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: menuType[] = []

  constructor(private orderService: OrderService) {
    this.cart = this.orderService.getCart()
  }

  getSumPrice() {
    return this.orderService.getSumPrice()
  }

}
