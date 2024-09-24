import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { menuType } from '../../../interfaces/menu.model';
import Swal from 'sweetalert2';
import { EditMenuComponent } from '../edit/edit.component';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../../emitters/emitter'; // Adjust the path as necessary

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @ViewChild(EditMenuComponent) editMenuComponent!: EditMenuComponent;

  selectedItem!: string;
  showAlert: boolean = false; // Variable to control the alert visibility
  menuItems!: menuType[]; // Specify type for menuItems
  message: string = ''; // Declare message property

  constructor(private menuService: MenuService, private http: HttpClient) {
    this.loadMenuItems();
  }

  deleteMenuById(id: string) {
    Swal.fire({
      title: 'Confirm deleting this menu?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33 ',
      cancelButtonColor: '##3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.deleteMenuById(id).subscribe(
          () => {
            this.menuItems = this.menuItems.filter((item) => item._id !== id);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error deleting menu item', error);
          }
        );
      }
    });
  }

  setUpdateValue(id: string) {
    this.editMenuComponent.getItem(id);
  }

  loadMenuItems() {
    this.menuService.getAllMenu().subscribe((result) => {
      this.menuItems = result;
    });
  }

  onMenuAdded() {
    this.loadMenuItems();
  }

  onMenuUpdate() {
    this.loadMenuItems();
  }

  ngOnInit(): void {
  }
}
