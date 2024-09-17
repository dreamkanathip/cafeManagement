import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoryType } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit{

  apiUrl = "http://localhost:5000/api"

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {}

  getAllCategory(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/allCategory`);
  }

  getSomeCategory(id: string) : Observable<categoryType> {
    return this.http.get<categoryType>(`${this.apiUrl}/category/${id}`);
  }

  deleteCategoryById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/category/${id}`)
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCategory`, category);
  }

  updateCategory(category:any, id:string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/categoryUpdate/${id}`, category)
  }

}
