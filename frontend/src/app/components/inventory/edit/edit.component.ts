import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditMenuComponent implements OnInit {
  @Output() menuUpdate = new EventEmitter<void>();
  // @Input() 

  updateId!: string;
  category!: any
  selectedCategory: string = "Select Category"
  imagePreview: string | ArrayBuffer | null = "/assets/placeholder.jpg";
  selectedFile: File | null = null; // Store the file here
  id!: string

  menuForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl('')
  })

  constructor(private menuService: MenuService) {
    this.menuService.getAllCategory().subscribe(result => {
      this.category = result;
    })
  }

  ngOnInit(): void { }

  selectCategory(i: number) {
    this.selectedCategory = this.category[i].category
    this.menuForm.get('category')?.setValue(this.selectedCategory);
  }

  getAllCategory() {
    return this.category
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  getItem(id: any) {
    this.updateId = id;
    this.menuService.getSomeMenu(id).subscribe((result) => {
      this.menuForm.patchValue({
        name: result.name,
        price: result.price.toString(),
        description: result.description,
        category: result.category,
        image: result.image
      });
        this.imagePreview = "data:image/png;base64,"+result.image;
        this.selectedCategory = result.category;
    })
    console.log(this.menuForm)
  }

  clearForm() {
    this.menuForm.reset();
    this.imagePreview = "/assets/placeholder.jpg"
    this.selectedCategory = "Select Category"
  }

  submit() {
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
          this.menuService.updateMenu(formData, this.updateId).subscribe((result) => {
            console.log('Post response:', result);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Menu work has been updated!",
              showConfirmButton: true,
            });
            this.menuUpdate.emit();
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
