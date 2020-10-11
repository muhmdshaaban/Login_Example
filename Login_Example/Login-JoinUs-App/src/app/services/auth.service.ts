import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://localhost:3000/api/auth";


  isValidSignIn(loginData, callback) {
    this.httpClient.post(this.url, loginData).subscribe(response => {
      if (response && (response as any).token) {
        localStorage.setItem("token", (response as any).token);
        callback(true);

      } else {
        callback(false);

      }
    }, error => {

      callback(false);
    });

  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }

  }

  currentUser() {
    let token = localStorage.getItem("token");

    if (token) {
      const helper = new JwtHelperService();
      const user = helper.decodeToken(token);
      user.token = token;
      return user;
    } else {
      return null;
    }
  }

}
