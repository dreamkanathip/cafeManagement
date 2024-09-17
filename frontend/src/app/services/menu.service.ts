import { Injectable, OnInit } from '@angular/core';
import { menuType } from '../interfaces/menu.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit{

  apiUrl = "http://localhost:5000/api"

  constructor(
    private http: HttpClient
  ) {
  }
  
  ngOnInit(): void {}

  getAllMenu(): Observable<menuType[]> {
    return this.http.get<menuType[]>(`${this.apiUrl}/allMenu`);
  }

  getAllCategory(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/allCategory`);
  }

  deleteMenuById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/menu/${id}`)
  }
  addMenu(menu: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addMenu`, menu);
  }
  updateMenu(menu:any, id:string): Observable<any> {
    return this.http.put(`${this.apiUrl}/menuUpdate/${id}`, menu)
  }
}
