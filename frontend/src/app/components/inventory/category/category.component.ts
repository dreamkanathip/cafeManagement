
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { categoryType } from '../../../interfaces/category.model';
import { CategoryService } from '../../../services/category.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Output() categoryAdded = new EventEmitter<void>();
  editCategory!: string;

  categories: categoryType[] = []

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  constructor(private menuService: MenuService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.menuService.getAllCategory().subscribe(result => {
      this.categories = result;
      console.log('Categories received.')
    })
  }

  updateCategoryById(id:string) {
    this.editCategory = id;
  }
  
  loadCategoryItems() {
    console.log("loaded")
    this.menuService.getAllCategory().subscribe((result) => {
        this.categories = result;
    });
  }

  onCategoryEdit() {
    this.loadCategoryItems()
  }

  deleteMenuById(id: string) {
    this.categoryService.deleteCategoryById(id).subscribe(result => {
      this.categories = this.categories.filter((item: categoryType) => item._id !== id);
    }, error => {
      console.error('Error deleting menu item', error);
    });
  }

  submit(){
    if (this.categoryForm) {
      const newCategory = new FormData;

      newCategory.append('name', this.categoryForm.get('name')?.value ?? '');

      this.categoryService.addCategory(newCategory).subscribe((result) => {
        console.log('Category added:', result);
        Swal.fire('Success','Added Successfully')
      });
    } else {
      console.log('Category Name is invalid or Already Exist');
    }
  }
}
