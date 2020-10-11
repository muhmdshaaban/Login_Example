import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
    , private router: Router
    , private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('Message from OnInit');
  }

  isNotValid = false;
  onSignIn(loginData) {
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

    this.authService.isValidSignIn(loginData, (isValidLogin) => {
      if (isValidLogin) {
        // let dest = returnUrl ? returnUrl : '/';
        // this.router.navigate([dest]);
        this.router.navigate([returnUrl || '/']);
      } else {
        this.isNotValid = true;
      }
    })
  }

}
