import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  ngOnInit() { }
  constructor(private _ser: LeenURLService, private _route: Router) { }

  loginUser(data: any) {
    
    var form = new FormData();
    for (let k in data) {
      form.append(k, data[k])
    }
   

    this._ser.login(form).subscribe((newData) => {
      alert("logged in successfully")
    

      localStorage.setItem("userId", newData.userId)
    
      

      if (newData.email == "leen@gmail.com") {
        this._route.navigate(['/dashboard'])
      }
      else {
        this._route.navigate(['/'])
      }


   

    },
      (error) => { alert(error.error) }
    )







    }
}


