import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { menuType } from '../../../interfaces/menu.model';
import Swal from 'sweetalert2';

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
  updateId!: string

  constructor(private menuService: MenuService){
    this.menuService.getAllMenu().subscribe(result => {
      this.menuItems = result
    })
  }
  
  deleteMenuById(id: string) {
    Swal.fire({
      title: "Are you sure?",
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
    this.updateId = id;
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
  onMenuEdit() {
    this.loadMenuItems()
  }

  ngOnInit(): void {
  }
}