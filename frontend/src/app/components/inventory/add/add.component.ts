import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddMenuComponent implements OnInit{
  @Output() menuAdded = new EventEmitter<void>();
  category!: any
  selectedCategory: string = "Select Category"
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null; // Store the file here
  

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
    console.log('Add Menu modal hace receieved all category')
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
    this.imagePreview =''
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
      
      this.menuService.addMenu(formData).subscribe((result) => {
        Swal.fire('Success', 'Added successful!', 'success');
        this.menuAdded.emit();
        this.clearForm()
      });
    } else {
      console.log('Form is invalid or no image selected');
    }
  }
}