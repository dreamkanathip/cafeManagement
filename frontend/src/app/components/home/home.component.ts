import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emitters/emitter'; // Adjust the path as necessary

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.message = `WELCOME ${res.name}!`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          console.error('Error fetching user data:', err);
          this.message = 'An error occurred. Please try again later.';
          Emitters.authEmitter.emit(false); // Update emit based on error
        }
      );
  }
}
