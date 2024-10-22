import { Component } from '@angular/core';
import { DuhaUrlService } from '../duha-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {

  animalId: any
  ngOnInit() {
    this.animalId = this._activate.snapshot.paramMap.get('id')
    console.log(" this.animalId", this.animalId)

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
