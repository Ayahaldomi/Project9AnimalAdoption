import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  user: any = {
    fullName: '',
    email: '',
    password: '',
    confirmpassword: ''
  };

  userId: number | null = null;
  
  constructor(
    private userService: LeenURLService,
    private router: Router
  ) { }

  ngOnInit() {
    // الاشتراك في BehaviorSubject للحصول على userId
    this.userService.currentUserId.subscribe((id: any) => {
      this.userId = id;
      console.log("this is editeprofile : " + this.userId);
      if (this.userId) {
        // جلب بيانات المستخدم عند توفر userId
        this.getUserDetails();
      } else {
        console.error('No userId available');
      }
    });
  }

  // جلب بيانات المستخدم
  getUserDetails() {
    debugger;
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data; // ملء النموذج ببيانات المستخدم
          console.log(this.user);
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }

  // تحديث بيانات المستخدم باستخدام FormData
  updateUser(data:any) {
    const formData = new FormData();
    formData.append('fullName', this.user.fullName);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('confirmpassword', this.user.confirmpassword);

    this.userService.editUser(formData).subscribe(
      (response) => {
        alert('Profile updated successfully');
        this.router.navigate(['/profile']); // إعادة التوجيه لصفحة البروفايل بعد التحديث
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
}
