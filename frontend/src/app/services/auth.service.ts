import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkAuthentication();
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>('YOUR_API_ENDPOINT/login', credentials).pipe(
      tap((response) => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
        }
        this.authStatusSubject.next(true);
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.authStatusSubject.next(false);
  }

  checkAuthentication(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      this.authStatusSubject.next(!!token);
    }
  }

  get isAuthenticated(): boolean {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }
}
