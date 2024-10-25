import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAdmin = new BehaviorSubject<boolean>(false); // `false` تعني أن المستخدم ليس Admin
  isAdminLoggedIn = this.isAdmin.asObservable(); // يمكننا الاشتراك في هذه القيمة لمراقبة التغييرات

  constructor(private router: Router) { }

  // دالة لتحديث حالة الـ Admin
  setAdminStatus(isAdmin: boolean) {
    this.isAdmin.next(isAdmin); // تحديث حالة الـ Admin
  }

  // دالة لتسجيل الخروج
  logout() {
    this.isAdmin.next(false); // إعادة تعيين حالة الـ Admin عند تسجيل الخروج
    this.router.navigate(['/login']); // إعادة التوجيه لصفحة تسجيل الدخول
  }
}
