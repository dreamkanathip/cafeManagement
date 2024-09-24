import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../frontend/src/app/services/auth.service'; // บริการตรวจสอบการล็อกอิน

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // อนุญาตให้ไปต่อได้
    } else {
      this.router.navigate(['/login']); // ถ้าไม่ได้ล็อกอิน เปลี่ยนไปหน้าเข้าสู่ระบบ
      return false; // ป้องกันการเข้าถึงเส้นทาง
    }
  }
}
