import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myProfile: any;
  constructor(private profileService: UsersService, private auth: AuthService) { }


  ngOnInit() {
    this.profileService.showProfile().subscribe(user => {
      this.myProfile = user;
    })

  }

}
