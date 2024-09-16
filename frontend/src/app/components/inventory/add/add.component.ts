import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddMenuComponent implements OnInit{

  category!: any
  selectedCategory: string = "Select Category"
  imagePreview: string | ArrayBuffer | null = null;
  
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.menuForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.menuForm.get('name')?.value ?? '');
      formData.append('price', this.menuForm.get('price')?.value ?? '');
      formData.append('description', this.menuForm.get('description')?.value ?? '');
      formData.append('category', this.menuForm.get('category')?.value ?? '');
      
      // Append the file as 'image'
      formData.append('image', this.selectedFile);

      // Send formData to the server
      this.menuService.addMenu(formData).subscribe((result) => {
        console.log('Post response:', result);
        Swal.fire('Success', 'Added successful!', 'success');
        this.menuAdded.emit();
      });
      console.log('Form Submitted', formData);
    } else {
      console.log('Form is invalid or no image selected');
    }
  }

}
