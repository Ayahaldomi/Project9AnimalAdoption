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

  openTwitterShare(event: MouseEvent) {
    event.preventDefault(); // Prevent the default action of opening the link in a new tab
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const twitterUrl = `https://twitter.com/intent/tweet?text=Check+out+this+awesome+content!&url=${this.pageUrl}`;

    window.open(
      twitterUrl,
      'Share on Twitter',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  openFacebookShare(event: MouseEvent) {
    event.preventDefault(); // Prevent default anchor behavior
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Replace with the URL you want to share
    //const facebookUrl = `https://www.facebook.com/sharer/sharer.php?&quote=${encodeURIComponent(`Check out this awesome content! ${this.pageUrl}`)}`;
    //const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.pageUrl)}&quote=${encodeURIComponent('Check out this awesome content!')}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

    window.open(
      facebookUrl,
      'Share on Facebook',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  shareOnFacebook() {
    const url = 'https://yourwebsite.com/page';  // Page URL with OG meta tags
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  }



}
