import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddMenuComponent {
  category = [
    {label: "Desserts", value: "desserts"},
    {label: "Drinks", value: "drinks"},
  ]
  selectedCategory: string = "Select Category"
  
  constructor() {
    console.log(this.selectedCategory)
  }
  selectCategory(i: number) {
    this.selectedCategory = this.category[i].label
  }
  getAllCategory() {
    return this.category
  }
}
