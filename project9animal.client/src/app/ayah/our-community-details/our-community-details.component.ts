import { Component } from '@angular/core';
import { AyahURLService } from '../ayah-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-our-community-details',
  templateUrl: './our-community-details.component.html',
  styleUrl: './our-community-details.component.css'
})
export class OurCommunityDetailsComponent {
  parameter: any;
  story:any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.SeccessStoryByID(this.parameter)
  }

  constructor(private _ser: AyahURLService, private _route: ActivatedRoute) { }

  SeccessStoryByID(id: any) {
    this._ser.getSeccessStoryByID(id).subscribe((data) => {
      this.story = data
      console.log("this is the story" + data)
    })
  }

}
