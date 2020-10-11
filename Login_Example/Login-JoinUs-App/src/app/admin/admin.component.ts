import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allUsers: any[];
  user: any;
  index: any;
  changed: boolean = false;

  constructor(private profileSettings: UsersService, private userAuth: AuthService) { }

  ngOnInit() {
    this.profileSettings.getUsers().subscribe(response => {
      this.allUsers = (response as any);
    })
  }
  values(user) {
    this.user = user
    this.index = this.allUsers.indexOf(user);
  }
  changedfun1() {
    this.changed = !this.changed;
  }
  edite(user) {
    this.profileSettings.updateUser(this.user._id, user).subscribe(response => {
      this.allUsers.splice(this.index, 1, response)
    })
    this.changedfun1();
  }
  removefun(user) {
    this.index = this.allUsers.indexOf(user);
    this.profileSettings.removeUser(user._id).subscribe()
    this.allUsers.splice(this.index, 1);
  }


}
