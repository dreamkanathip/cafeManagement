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
  menuItems: menuType[] = [
  ];

  constructor(
    private menuService: MenuService
  ){
    console.log("sssss", this.menuItems)
  }
  
  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe(
      (data: menuType[]) => {
        this.menuItems = data;
      },
      (error) => {
        console.error('Error fetching menu items', error);
      }
    );
  }
  getAllMenu(){
    return this.menuService.getAllMenu()
  }
}
