import { Component } from '@angular/core';
import { AyahURLService } from '../ayah-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-our-community-details',
  templateUrl: './our-community-details.component.html',
  styleUrl: './our-community-details.component.css'
})
export class OurCommunityDetailsComponent {
  parameter: any;
  story: any;
  like: any;
  commentcount: any;
  comment: any;
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.SeccessStoryByID(this.parameter)
    this.likes(this.parameter)
    this.comments(this.parameter)
    this.commentCount(this.parameter)
    this.isItLiked()
  }
  pageUrl: string;

  constructor(private _ser: AyahURLService, private _route: ActivatedRoute, private _router: Router, private location: Location)
  {
    this.pageUrl = encodeURIComponent(window.location.href); // Or this.location.path() if you need relative URLs

  }

  SeccessStoryByID(id: any) {
    this._ser.getSeccessStoryByID(id).subscribe((data) => {
      this.story = data
      console.log("this is the story" + data)
    })
  }

  likes(id: any) {
    this._ser.getLikes(id).subscribe((data) => {
      this.like = data
    })
  }
  commentCount(id: any) {
    this._ser.getCommentCount(id).subscribe((data) => {
      this.commentcount = data
    })
  }

  comments(id: any) {
    this._ser.getComments(id).subscribe((data) => {
      this.comment = data
    })
  }
  likePOST = {
    "userId": 4,
    "storyId": 0
  }
  isItLikedObj: any
  isItLiked() {
    this.likePOST.storyId = this.parameter
    this._ser.LikeIsIt(this.likePOST).subscribe((data) => {
      this.isItLikedObj = data
      console.log(data)
      console.log("isItLikedObj" + this.isItLikedObj)
    });
  }

  addLike() {
    this.likePOST.storyId = this.parameter
    this._ser.postLike(this.likePOST).subscribe((data) => {
      //this._router.navigate([`/OurCommunityDetails`, this.parameter]);
      this.SeccessStoryByID(this.parameter)
      this.likes(this.parameter)
      this.comments(this.parameter)
      this.commentCount(this.parameter)
      this.isItLiked()
    });
    this.parameter = this._route.snapshot.paramMap.get("id");
   

  }
}
