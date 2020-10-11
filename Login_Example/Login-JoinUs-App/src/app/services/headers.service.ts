import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() { }

  setHeader() {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders().set('x-auth-token', token);
    let returnheader = header;
    header.delete('x-auth-token');
    return returnheader;

  }
}
