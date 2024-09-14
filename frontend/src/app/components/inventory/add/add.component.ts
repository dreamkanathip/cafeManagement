import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';

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
    this.menuService.addMenu(this.menuForm)
    console.log('submit')
  }

}
