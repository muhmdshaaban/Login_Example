import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private usersService: UsersService, private router: Router) {

  }

  ngOnInit() {

  }

  wrongEmail = false;
  onSupmit(user) {
    this.usersService.addUser(user, isValid => {
      if (isValid) {
        this.router.navigate(['/']);
        return true;
      } else {
        this.wrongEmail = true;
      }
    })
  }

}
