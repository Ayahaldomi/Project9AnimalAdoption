import { Component, OnInit } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  users: any[] = []; 

  constructor(private userService: LeenURLService) { }

  ngOnInit(): void {
    this.userService.getUsers1().subscribe((data) => {
      this.users = data; 
    });
  }
}
