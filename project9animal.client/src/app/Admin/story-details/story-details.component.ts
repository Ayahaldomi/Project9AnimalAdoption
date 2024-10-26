import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlBassamService } from '../../Bassam/BassamUrl/url-bassam.service';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css'] // Change 'styleUrl' to 'styleUrls'
})
export class StoryDetailsComponent implements OnInit {
  storyId: number | undefined;
  story: any;

  constructor(private route: ActivatedRoute, private urlBassamService: UrlBassamService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyId = +params['id']; // Correctly retrieve the id parameter
      // Fetch story details based on storyId
      this.fetchStoryDetails(); // Call method to fetch story details
    });
  }
  fetchStoryDetails(): void {
    if (this.storyId) {
      this.urlBassamService.getSuccessStoryById(this.storyId).subscribe(
        (data) => {
          this.story = data; // Assign fetched story to the property
        },
        (error) => {
          console.error('Error fetching story', error); // Handle error
        }
      );
    }
  }
}
