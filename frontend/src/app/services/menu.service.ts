import { Injectable, OnInit } from '@angular/core';
import { menuType } from '../interfaces/menu.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoryType } from '../interfaces/category.model';
@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit{

  apiUrl = "http://localhost:5000/api"


  constructor(private http: HttpClient) {
  }
  
  ngOnInit(): void {}

  getAllMenu(): Observable<menuType[]> {
    return this.http.get<menuType[]>(`${this.apiUrl}/allMenu`, { withCredentials: true });
  }

  getSomeMenu(id: string) : Observable<menuType> {
    return this.http.get<menuType>(`${this.apiUrl}/menu/${id}`,{ withCredentials: true });
  }
  deleteMenuById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/menu/${id}`,{ withCredentials: true })
  }
  addMenu(menu: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addMenu`, menu, { withCredentials: true });
  }
  updateMenu(menu:any, id:string): Observable<any> {
    console.log("service", menu)
    return this.http.put(`${this.apiUrl}/menuUpdate/${id}`, menu,{ withCredentials: true })
  }
}
