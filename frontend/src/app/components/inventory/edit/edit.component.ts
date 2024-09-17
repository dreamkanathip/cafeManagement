import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditMenuComponent implements OnInit{
  @Output() menuEdit = new EventEmitter<void>();
  @Input() updateId!: string;
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
    console.log(this.selectedCategory)
  }

  ngOnInit(): void {}

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
  clearForm() {
    this.menuForm.reset();
    this.imagePreview ="/assets/placeholder.jpg"
    this.selectedCategory = "Select Category"
  }
  
  submit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.menuForm.get('name')?.value ?? '');
      formData.append('price', this.menuForm.get('price')?.value ?? '');
      formData.append('description', this.menuForm.get('description')?.value ?? '');
      formData.append('category', this.menuForm.get('category')?.value ?? '');
      
      // Append the file as 'image'
      formData.append('image', this.selectedFile);

      // Send formData to the server
      this.menuService.updateMenu(formData, this.updateId).subscribe((result) => {
        console.log('Post response:', result);
        Swal.fire('Success', 'Updated successful!', 'success');
        this.menuEdit.emit();
      });
      console.log('Form Submitted', formData);
    } else {
      console.log('Form is invalid or no image selected');
    }
  }
}
