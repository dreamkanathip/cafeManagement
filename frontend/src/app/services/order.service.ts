import { Injectable } from '@angular/core';
import { menuType } from '../interfaces/menu.model';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { categoryType } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = "http://localhost:5000/api"
  // fix Filter และ Menu

  filters = [];

  menu: menuType[] = []

  cartCounter: number = 0
  sumPrice: number = 0
  cart: menuType[] = []
  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    private http: HttpClient
  ) {
    this.menuService.getAllMenu().subscribe(result => {
      this.menu = result.sort((a: menuType, b: menuType) => a.name.localeCompare(b.name));
    })
    this.categoryService.getAllCategory().subscribe(result => {
      this.filters = result.sort((a: categoryType, b: categoryType) => a.categoryName.localeCompare(b.categoryName));
      console.log('Categories received.')
    })
  }

  add(menuID: number) {
    console.log('Add product to cart');
    this.cart.push(this.menu[menuID])
    this.sumPrice += this.menu[menuID].price
    this.cartCounter += 1;
  }

  getAllMenu(): Observable<menuType[]> {
    return this.http.get<menuType[]>(`${this.apiUrl}/allMenu`);
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

  getMenu() {
    return this.menu
  }

  getCategory(){
    return this.filters
  }

  updateCart(updatedCart: menuType[]) {
    this.cart = updatedCart;

    let newSum: number = 0
    let newCount: number = 0

    this.cart.forEach((item) => {
      newSum += item.price
      newCount += 1
    })
    this.sumPrice = newSum
    this.cartCounter = newCount
  }

}
