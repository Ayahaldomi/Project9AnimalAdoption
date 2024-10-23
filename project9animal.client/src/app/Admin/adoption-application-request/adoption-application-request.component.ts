import { Component } from '@angular/core';
import { DuhaUrlService } from '../../Duha/duha-url.service';

@Component({
  selector: 'app-adoption-application-request',
  templateUrl: './adoption-application-request.component.html',
  styleUrl: './adoption-application-request.component.css'
})
export class AdoptionApplicationRequestComponent {

  ngOnInit() {
    this.getAllApplication();
  }

  constructor(private _ser: DuhaUrlService) {

  }
  dataApplicationArray: any
  getAllApplication() {

    this._ser.getAllApplication().subscribe((data) => {
      this.dataApplicationArray = data
    })
  }
}
