import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { menuType } from '../../../interfaces/menu.model';
import Swal from 'sweetalert2';
import { EditMenuComponent } from '../edit/edit.component';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @ViewChild(EditMenuComponent) editMenuComponent!: EditMenuComponent;

  selectedItem!:string
  showAlert:boolean = false; // Variable to control the alert visibility
  menuItems!: any;
  category!: any;

  constructor(private menuService: MenuService){
    this.loadMenuItems()
  }
  
  deleteMenuById(id: string) {
    Swal.fire({
      title: "Confirm deleting this menu?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.deleteMenuById(id).subscribe(result => {
          this.menuItems = this.menuItems.filter((item: menuType) => item._id !== id);
        }, error => {
          console.error('Error deleting menu item', error);
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  updateMenuById(id:string) {
    this.setUpdateValue(id)
  }
  setUpdateValue(id: string) {
    this.editMenuComponent.getItem(id)
  }
  loadMenuItems() {
    console.log("loaded")
    this.menuService.getAllMenu().subscribe((result) => {
        this.menuItems = result;
    });
  }

  onMenuAdded() {
    this.loadMenuItems()
  }
  onMenuUpdate() {
    this.loadMenuItems()
  }

  ngOnInit(): void {
  }
}