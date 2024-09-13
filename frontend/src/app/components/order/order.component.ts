import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  // fix Filter และ Menu

  filters = ['All', 'Drinks', 'Desserts', 'Others'];

  menu: any = [
    { "name": "Latte", "category": "Drinks" },
    { "name": "Mocha", "category": "Drinks" },
    { "name": "Cappuccino", "category": "Drinks" },
    { "name": "Espresso", "category": "Drinks" },
    { "name": "Vanilla Cake", "category": "Desserts" },
    { "name": "Mocha Cake", "category": "Desserts" },
    { "name": "Cocoa Cake", "category": "Desserts" },
    { "name": "Other", "category": "Others" },
  ]

  currentFilter = 'all';

  constructor() { }

  ngOnInit(): void { }

  filterMenu(category: string) {
    this.currentFilter = category.toLowerCase();
  }

  isItemVisible(category: string): boolean {
    return this.currentFilter === 'all' || category.toLowerCase() === this.currentFilter;
  }
}
