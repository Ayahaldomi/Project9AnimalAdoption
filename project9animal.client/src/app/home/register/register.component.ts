import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'

})
export class RegisterComponent {

  ngOnInit() {

  }

  constructor(private _ser: LeenURLService) { }


  addNewUser(data: any) {

    debugger;
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    
    this._ser.addUser(form).subscribe(() =>
    
      alert("add User Sucssfully")
    )
  }

}
