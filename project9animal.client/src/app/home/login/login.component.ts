import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  ngOnInit() { }
  constructor(private _ser: LeenURLService, private _route: Router, private _activatedRoute: ActivatedRoute, private authService: AuthServiceService // إضافة AuthService هنا
) { }

  loginUser1(data: any) {
    const form = new FormData();
    for (let k in data) {
      form.append(k, data[k]);
    }

    this._ser.login(form).subscribe(
     
      (newData: any) => {
        debugger;
        alert("Logged in successfully");

       
        console.log("User ID from response:", newData.userId);

    
        this._ser.UserId.next(newData.userId); 

       
        console.log("User ID set in service:", newData.userId);

     
        
        debugger;
      

        if (data.email === 'admin@gmail.com') {

          this.authService.setAdminStatus(true); // تعيين حالة الـ Admin
          this._route.navigate(['/dashboard']); // توجيه المستخدم إلى الداشبورد
        } else {
          this.authService.setAdminStatus(false);
          this._route.navigate(['/']); // توجيه المستخدم إلى الصفحة الرئيسية
        }
      },
      (error) => {
        alert(error.error);
      }
    );
  }






  //loginUser(data: any) {
  //  // افترض أن `data.email` هو البريد الإلكتروني المسجل
  //  if (data.email === 'admin@example.com') {
      
  //    this.authService.setAdminStatus(true); // تعيين حالة الـ Admin
  //    this._route.navigate(['/dashboard']); // توجيه المستخدم إلى الداشبورد
  //  } else {
  //    this.authService.setAdminStatus(false);
  //    this._route.navigate(['/']); // توجيه المستخدم إلى الصفحة الرئيسية
  //  }
  //}









}


