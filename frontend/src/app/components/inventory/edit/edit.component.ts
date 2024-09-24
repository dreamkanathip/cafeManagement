import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

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
  submitted: boolean = false;
  
  menuForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  constructor(private menuService: MenuService, private categoryService: CategoryService) {
    this.getCategoriesFromApi()
    this.categoryService.menuReloadCategories(() => this.getCategoriesFromApi())
    
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

  ngOnInit(): void { }
  getCategoriesFromApi() {
    this.categoryService.getAllCategory().subscribe(result => {
      this.category = result;
    })
  }
  selectCategory(i: number) {
    this.selectedCategory = this.category[i].categoryName
    this.menuForm.get('category')?.setValue(this.selectedCategory);
  }

  getAllCategory() {
    return this.category
  }

  onImageChange(event: any) {
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

  // Utility function to convert Base64 string to a File object
  base64ToFile(base64String: string, fileName: string): File {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  getItem(id: any) {
    this.updateId = id;
    this.menuService.getSomeMenu(id).subscribe((result) => {
      this.menuForm.setValue({
        name: result.name,
        price: result.price.toString(),
        description: result.description,
        category: result.category,
        image: result.image
      });
        this.imagePreview = "data:image/png;base64,"+result.image;
        this.selectedCategory = result.category;
        this.selectedFile = this.base64ToFile(this.imagePreview, 'menuItem.png');
    })
    console.log(this.menuForm)
  }

  clearForm() {
    this.menuForm.reset();
    this.imagePreview = "/assets/placeholder.jpg"
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
