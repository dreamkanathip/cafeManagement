import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { categoryType } from '../../../interfaces/category.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Output() categoryAdded = new EventEmitter<void>();

  categories: categoryType[] = []

  categoryAdd = new FormControl('')

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getAllCategory().subscribe(result => {
      this.categories = result;
      console.log('Categories received.')
    })
  }

  submit(){
    const categoryName = this.categoryAdd.value
    if (categoryName) {
      const newCategory : categoryType = {
        categoryName : categoryName
      }
      // this.categoryService.addCategory(newCategory).subscribe((result) => {
      //   console.log('Category added:', result);
      //   Swal.fire('Success','Added Successfully')
      // });
    } else {
      console.log('Category Name is invalid or Already Exist');
    }
  }

}
