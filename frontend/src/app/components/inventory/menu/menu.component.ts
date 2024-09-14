import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { menuType } from '../../../interfaces/menu.model';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  selectedItem!:string
  showAlert:boolean = false; // Variable to control the alert visibility
  menuItems!: any;
  category!: any;

  constructor(private menuService: MenuService){
    this.menuService.getAllMenu().subscribe(result => {
      this.menuItems = result
    })
  }
  
  deleteMenuById(id: string) {
    this.menuService.deleteMenuById(id).subscribe(result => {
      this.menuItems = this.menuItems.filter((item: menuType) => item._id !== id);
    }, error => {
      console.error('Error deleting menu item', error);
    });
  }
  ngOnInit(): void {
  }
}
