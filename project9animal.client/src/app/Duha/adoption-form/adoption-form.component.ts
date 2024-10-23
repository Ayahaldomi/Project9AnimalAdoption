import { Component } from '@angular/core';
import { DuhaUrlService } from '../duha-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {


  animalId: any
  ngOnInit() {
    this.animalId = this._activate.snapshot.paramMap.get('id')
    console.log(" this.animalId", this.animalId)
    this.getAnimalsDetailsById()

  }
  constructor(private _ser: DuhaUrlService, private _activate: ActivatedRoute) { }


  animalDetails: any
  getAnimalsDetailsById() {
    this._ser.getAnimalDetailsByAnimalId(this.animalId).subscribe((data) => {
      this.animalDetails = data;
      console.log('Animal details:', this.animalDetails);
    }, error => {
      console.error('Error fetching Animal details:', error);
    });

  }
}
