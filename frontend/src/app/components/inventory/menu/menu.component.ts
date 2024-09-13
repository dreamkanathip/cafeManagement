import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  selectedItem!:string
  showAlert:boolean = false; // Variable to control the alert visibility

  constructor(
    private menuService: MenuService
  ){}
  getAllMenu(){
    return this.menuService.getAllMenu()
  }

  onSubmit() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }
}
