import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlBassamService } from '../BassamUrl/url-bassam.service';

@Component({
  selector: 'app-create-sucess-story',
  templateUrl: './create-sucess-story.component.html',
  styleUrl: './create-sucess-story.component.css'
})
export class CreateSucessStoryComponent {
  successStoryForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private urlBassamService: UrlBassamService) {
    this.successStoryForm = this.fb.group({
      UserId: ['1', Validators.required],
      AnimalName: ['', Validators.required],
      Title: ['', Validators.required],
      StoryText: ['', Validators.required],
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.successStoryForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('UserId','1');
      formData.append('AnimalName', this.successStoryForm.get('AnimalName')?.value);
      formData.append('Title', this.successStoryForm.get('Title')?.value);
      formData.append('StoryText', this.successStoryForm.get('StoryText')?.value);
      formData.append('PhotoUrlOrVideo', this.selectedFile);

      this.urlBassamService.createSuccessStory(formData).subscribe(
        response => {
          console.log('Story created successfully', response);
          alert('Success! Your story has been submitted.');
          // Optionally reset the form after successful submission
          this.successStoryForm.reset();
          this.selectedFile = null; // Reset selected file
        },
        error => {
          console.error('Error creating story', error);
          alert('Error! There was a problem submitting your story. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields and select a file.');
    
    }
    }

}
