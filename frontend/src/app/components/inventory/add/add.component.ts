import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';
import { categoryType } from '../../../interfaces/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddMenuComponent implements OnInit{
  @Output() menuAdded = new EventEmitter<void>();

  category!: any
  selectedCategory: string = "Select Category"
  imagePreview: string | ArrayBuffer | null = "/assets/placeholder.jpg";
  selectedFile: File | null = null; // Store the file here
  submitted: boolean = false

  menuForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  constructor(private menuService: MenuService, private categoryService: CategoryService) {
    this.getCategoriesFromApi()
    this.categoryService.menuReloadCategoriesAdd(() => this.getCategoriesFromApi())
  }

  get menuName() {
    return this.menuForm.get('name')
  }
  get menuPrice() {
    return this.menuForm.get('price')
  }
  get menuDescription() {
    return this.menuForm.get('description')
  }
  get menuCategory() {
    return this.menuForm.get('category')
  }
  get menuImage() {
    return this.menuForm.get('image')
  }

  ngOnInit(): void {}

  selectCategory(i: number) {
    this.selectedCategory = this.category[i].categoryName
    this.menuForm.get('category')?.setValue(this.selectedCategory);
  }

  getCategoriesFromApi() {
    this.categoryService.getAllCategory().subscribe(result => {
      this.category = result;
      console.log("called from add")
    })
  }

  onImageAdd(event: any) {
    console.log("add image")
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the file
      this.menuForm.get('image')?.setValue(file)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearForm() {
    this.menuForm.reset();
    this.imagePreview ="/assets/placeholder.jpg"
    this.selectedCategory = "Select Category"
  }

  submit() {
    this.submitted = true
    if (this.menuForm.valid && this.selectedFile) {
      const formData = new FormData();

      formData.append('name', this.menuForm.get('name')?.value ?? '');
      formData.append('price', this.menuForm.get('price')?.value ?? '');
      formData.append('description', this.menuForm.get('description')?.value ?? '');
      formData.append('category', this.menuForm.get('category')?.value ?? '');
      formData.append('image', this.selectedFile);
    
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.menuService.addMenu(formData).subscribe((result) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Menu work has been saved!",
              showConfirmButton: true,
            });
            this.menuAdded.emit();
            this.clearForm()
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