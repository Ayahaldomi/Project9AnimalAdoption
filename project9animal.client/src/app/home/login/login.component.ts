import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _ser: LeenURLService, private _router: Router) { }

  ngOnInit() { }

  loginUser(data: any) {
    debugger;
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.login(form).subscribe(
      response => {
        alert('Login Successful');
     
      },
      error => {
        alert('Login Failed');
        
      }
    );
  }
}
