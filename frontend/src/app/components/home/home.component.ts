import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emitters/emitter'; // Adjust the path as necessary

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log('Gender:', res.gender);
          console.log('First Name:', res.firstName); // ตรวจสอบค่าชื่อ
          console.log('Last Name:', res.lastName); // ตรวจสอบค่านามสกุล

          let title = '';
          if (res.gender === 'male') {
            title = 'Mr';
          } else if (res.gender === 'female') {
            title = 'Ms';
          }

          // ตรวจสอบว่ามี lastName และ lastName เป็น string ก่อนดึงตัวอักษรตัวแรก
          const firstLetterOfLastName =
            res.lastName && typeof res.lastName === 'string'
              ? res.lastName.charAt(0)
              : '';

          // สร้างข้อความต้อนรับ
          this.message = `${title} ${firstLetterOfLastName}. ${res.firstName}!`;

          console.log('Message:', this.message); // ตรวจสอบข้อความที่ถูกตั้งค่า

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
