import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoryType } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit{

  apiUrl = "http://localhost:5000/api"

  private loadCategory: () => void = () => {};
  private loadCategoryAdd: () => void = () => {};

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {}

  getAllCategory(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/allCategory`,{ withCredentials: true });
  }

  getSomeCategory(id: string) : Observable<categoryType> {
    return this.http.get<categoryType>(`${this.apiUrl}/category/${id}`,{ withCredentials: true });
  }
  deleteCategoryById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/category/${id}`,{ withCredentials: true })
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category`, category,{ withCredentials: true });
  }

  updateCategory(category:any, id:string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/categoryUpdate/${id}`, category,{ withCredentials: true })
  }

  menuReloadCategories(func: () => void) {
    this.loadCategory = func;
  }
  menuReloadCategoriesAdd(func: () => void) {
    this.loadCategoryAdd = func;
  }

  executeMenuReloadCategories() {
    if (this.loadCategory) {
      this.loadCategory();
      this.loadCategoryAdd();
      console.log("executed")
    }
  }
}
