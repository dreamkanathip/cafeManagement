import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { categoryType } from '../../../../interfaces/category.model';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editCategory',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditCategoryComponent implements OnInit {

  @Output() categoriesEdit = new EventEmitter<void>();
  updateId!: string;
  recentName!: string
  

  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  })

  constructor (private categoryService: CategoryService) {
    
  }

  ngOnInit() {}

  getRecentCategory(id: any) {
    this.updateId = id;
    this.categoryService.getSomeCategory(id).subscribe((result) => {
      this.categoryForm.patchValue({
        categoryName: result.categoryName,
      });
    })
  }

submit() {
  if (this.categoryForm.valid) {
    const formData = new FormData();
      formData.append('categoryName', this.categoryForm.get('categoryName')?.value ?? '');

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.updateCategory(formData, this.updateId).subscribe((result) => {
          console.log('Post response:', result);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Category has been updated!",
            showConfirmButton: true,
          });
          this.categoriesEdit.emit();
          this.categoryForm.reset()
        });
      }
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
