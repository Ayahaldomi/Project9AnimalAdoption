import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _ser: LeenURLService) { }

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
