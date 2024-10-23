import { Component } from '@angular/core';
import { DuhaUrlService } from '../duha-url.service';
import { ActivatedRoute } from '@angular/router';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {

 
  userId: any ; 
  animalId: any
  ngOnInit() {
    this.animalId = this._activate.snapshot.paramMap.get('id')
    console.log(" this.animalId", this.animalId)
    this.getAnimalsDetailsById()

    // Subscribe to the UserId from the service to get the logged-in user's ID
    this._leen.UserId.subscribe((data) => {
      console.log("User ID from service after subscription:", data);
      this.userId = data;

      
    });
    this.getUserDetails();

  }
  constructor(private _ser: DuhaUrlService, private _activate: ActivatedRoute, private _leen: LeenURLService) { }


  animalDetails: any
  getAnimalsDetailsById() {
    this._ser.getAnimalDetailsByAnimalId(this.animalId).subscribe((data) => {
      this.animalDetails = data;
      console.log('Animal details:', this.animalDetails);
    }, error => {
      console.error('Error fetching Animal details:', error);
    });

  }

  // Fetch User Details based on the userId
  userDetails: any;
 
  getUserDetails() {
    if (this.userId) {
      this._ser.getUserById(this.userId).subscribe(
        (data) => {
          this.userDetails = data;
          console.log("User details:", this.userDetails);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error("User ID is not available, unable to fetch user details");
    }
  }

  addNewAdoptionform(data: any, animalId:any ,userId:any) {
    debugger;
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
      
    }
    form.append("userId", userId)
    form.append("animalId", animalId)
    this._ser.postAdoptionApplication(form).subscribe(
      (datas) => {
        alert("Add successfully!");
      },
      (error) => {
        console.error('Error submitting adoption form:', error);
      }
    );

  }

}
