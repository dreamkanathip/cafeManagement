
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
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
export class CategoryComponent implements OnInit {

  @Output() categoryAdded = new EventEmitter<void>();
  editCategory!: any;
  showEdit: boolean = false
  updateId!: string

  categories: categoryType[] = []

  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  })

  categoryEditForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  })

  constructor(private menuService: MenuService,
    private categoryService: CategoryService,) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(result => {
      this.categories = result;
      console.log('Categories received.')
    })
  }

  updateCategoryById(id: any) {
    this.categoryService.getSomeCategory(id).subscribe((result) => {
      this.categoryEditForm.patchValue({
        categoryName: result.categoryName,
      });
      this.updateId = result._id
      this.editCategory = result.categoryName
    })
    this.showEdit = !this.showEdit
  }

  loadCategoryItems() {
    console.log("loaded")
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categories = result;
    });
  }

  onCategoryEdit() {
    this.loadCategoryItems()
  }

  deleteCategoryById(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33 ',
      cancelButtonColor: '##3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe(() => {
          this.categories = this.categories.filter(item => item._id !== id);
          Swal.fire('Deleted!', 'The category has been deleted.', 'success');
          this.categoryService.executeMenuReloadCategories()
        }, error => {
          console.error('Error deleting category', error);
          Swal.fire('Error!', 'Could not delete category. Please try again.', 'error');
        });
      }
    });
  }

  cancelAdd() {
    this.categoryForm.reset
  }
  checkCategoryRepeat() {
    const enteredCategory = this.categoryForm.get('categoryName')?.value?.trim().toLowerCase() ?? '';

    if (enteredCategory) {
      const isDuplicate = this.categories.some(category =>
        category.categoryName.trim().toLowerCase() === enteredCategory
      );

      if (isDuplicate) {

        this.categoryForm.get('categoryName')?.setErrors({ duplicate: true });
      } else {
        // If no duplicates are found, clear any existing errors
        this.categoryForm.get('categoryName')?.setErrors(null);
      }
    }
  }

  checkCategoryEditRepeat() {
    const enteredCategory = this.categoryEditForm.get('categoryName')?.value?.trim().toLowerCase() ?? '';

    if (enteredCategory) {
      const isDuplicate = this.categories.some(category =>
        category.categoryName.trim().toLowerCase() === enteredCategory
      );

      if (isDuplicate) {

        this.categoryEditForm.get('categoryName')?.setErrors({ duplicate: true });
      } else {
        // If no duplicates are found, clear any existing errors
        this.categoryEditForm.get('categoryName')?.setErrors(null);
      }
    }
  }

  cancelEdit() {
    this.showEdit = false;
    this.categoryEditForm.reset()
  }

  submit() {
    this.checkCategoryRepeat();
    if (this.categoryForm.valid && !this.categoryForm.get('categoryName')?.errors) {
      console.log(this.categoryForm)
      const editCategory: any = {
        categoryName: this.categoryForm.get('categoryName')?.value ?? ''
      };

      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.addCategory(editCategory).subscribe((result) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "New Category has been saved!",
              showConfirmButton: true,
            });
            this.loadCategoryItems()
            this.categoryForm.reset()
            this.categoryService.executeMenuReloadCategories()
          });
        }
      });
    } else {
      if (this.categoryForm.get('categoryName')?.errors) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Category",
          text: "This category already exists.",
          showConfirmButton: true,
        });
      } else {
        console.log('Please complete the form');
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Please complete the form",
          showConfirmButton: true,
        });
      }
    }
  }

  submitEdit() {
    this.checkCategoryEditRepeat();
    if (this.categoryEditForm.valid && !this.categoryEditForm.get('categoryName')?.errors) {
      const updatedCategory = {
        categoryName: this.categoryEditForm.get('categoryName')?.value ?? ''
      };

      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.updateCategory(updatedCategory, this.updateId).subscribe((result) => {
            console.log('Post response:', result);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Category has been updated!",
              showConfirmButton: true,
            });
            this.loadCategoryItems()
            this.categoryEditForm.reset()
            this.showEdit = false;
            this.categoryService.executeMenuReloadCategories()
          });
        }
      });
    } else {
      if (this.categoryForm.get('categoryName')?.errors) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Category",
          text: "This category already exists.",
          showConfirmButton: true,
        });
      } else {
        console.log('Please complete the form');
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Please complete the form",
          showConfirmButton: true,
        });
      }
    }
  }
}
