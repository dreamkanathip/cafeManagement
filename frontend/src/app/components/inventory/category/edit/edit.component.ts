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

  @Output() menuEdit = new EventEmitter<void>();
  @Input() updateId!: string;
  recentName!: string

  newCategoryName = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  constructor (private categoryService: CategoryService) {
    this.categoryService.getSomeCategory(this.updateId).subscribe(result => {
      this.recentName = result.categoryName;
      console.log('Categories received.')
    })
  }

  ngOnInit() {}

  submit(){
    if (this.newCategoryName) {
      const updateCategory = new FormData;

      updateCategory.append('name', this.newCategoryName.get('name')?.value ?? '');
      this.categoryService.updateCategory(updateCategory, this.updateId).subscribe((result) => {
        Swal.fire('Success', 'Updated successful!', 'success');
        this.menuEdit.emit();
      });
    } else {
      console.log('Category Name is invalid or Already Exist');
    }
  }

}
