import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emitters } from '../../emitters/emitter';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  authenticated = false;
  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.authService.authStatus$.subscribe((status) => {
      this.authenticated = status;
    });
  }
  logout(): void {
    this.http
      .post('http://localhost:5000/api/logout', {}, { withCredentials: true })
      .subscribe(() => (this.authenticated = false));
    this.authService.logout();
  }
}
