import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private menuService: MenuService
  ){
  }

  getAllMenu(){
    return this.menuService.getAllMenu()
  }

}
