import { Component } from '@angular/core';
import { UrlBassamService } from '../BassamUrl/url-bassam.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  successStories: any[] = [];
  constructor(private urlBassamService: UrlBassamService) { }


  ngOnInit(): void {
    this.urlBassamService.getSuccessStories().subscribe(
      data => {
        this.successStories = data;
        console.log(this.successStories);
      },
      error => {
        console.error('Error fetching success stories:', error);
      }
    );
  }


}
