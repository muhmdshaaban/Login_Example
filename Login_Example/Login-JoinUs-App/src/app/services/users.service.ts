import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  url: string = "http://localhost:3000/api/users";
  token: any;

  constructor(private http: HttpClient, private header: HeadersService) { }
  addUser(user, callback) {
    this.http.post(this.url, user).subscribe(response => {
      if (response && (response as any).token) {
        localStorage.setItem("token", (response as any).token);
        callback(true);
      } else {

        callback(false);
      }
    }, (error) => {
      callback(false);
    })
  }

  showProfile() {
    return this.http.get(this.url + "/me", { headers: this.header.setHeader() })
  }
  getUsers() {
    return this.http.get(this.url, { headers: this.header.setHeader() });
  }
  updateUser(userId, user) {
    return this.http.put(this.url + '/' + userId, user, { headers: this.header.setHeader() })
  }
  removeUser(userId) {
    return this.http.delete(this.url + '/' + userId, { headers: this.header.setHeader() });
  }

}
