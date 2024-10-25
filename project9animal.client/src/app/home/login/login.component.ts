import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  ngOnInit() { }
  constructor(private _ser: LeenURLService, private _route: Router, private _activatedRoute: ActivatedRoute, private authService: AuthService // إضافة AuthService هنا
) { }

  loginUser(data: any) {
    const form = new FormData();
    for (let k in data) {
      form.append(k, data[k]);
    }

    this._ser.login(form).subscribe(
      (newData: any) => {
        alert("Logged in successfully");

       
        console.log("User ID from response:", newData.userId);

    
        this._ser.UserId.next(newData.userId); 

       
        console.log("User ID set in service:", newData.userId);

     
        const redirectTo = this._activatedRoute.snapshot.queryParamMap.get('redirectTo');
        const animalId = this._activatedRoute.snapshot.queryParamMap.get('animalId');

        console.log("Redirect To:", redirectTo);
        console.log("Animal ID in login:", animalId);

        if (redirectTo && animalId) {
          console.log("Navigating to:", `${redirectTo}/${animalId}`);
          this._route.navigate([`${redirectTo}/${animalId}`]);  
        } else if (newData.email === 'huda@gmail.com') {
          this._route.navigate(['/dashboard']);
        } else {
          this._route.navigate(['/']);
        }
      },
      (error) => {
        alert(error.error);
      }
    );
  }






  loginUser1(data: any) {
    // افترض أن `data.email` هو البريد الإلكتروني المسجل
    if (data.email === 'admin@example.com') {
      this.authService.setAdminStatus(true); // تعيين حالة الـ Admin
      this._route.navigate(['/dashboard']); // توجيه المستخدم إلى الداشبورد
    } else {
      this.authService.setAdminStatus(false);
      this._route.navigate(['/']); // توجيه المستخدم إلى الصفحة الرئيسية
    }
  }









}


