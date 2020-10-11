import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: string = "http://localhost:3000/api/products";

  getAllProducts() {
    let token = this.authService.currentUser().token;
    let headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.get(this.url, { headers });
  }


}
