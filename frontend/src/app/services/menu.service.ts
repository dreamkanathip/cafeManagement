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
}

