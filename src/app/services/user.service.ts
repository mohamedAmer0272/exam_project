import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new Subject();
  //apiUrl: string = 'http://localhost:3000/';
  apiUrl: string = 'https://localhost:7235/api/Users';
  apiLogin: string = 'https://localhost:7235/api/Login/1';
  constructor(private httpClient: HttpClient) {}

  getUsersAll(type: string) {
    //return this.httpClient.get(`${this.apiUrl}${type}`);
    return this.httpClient.get(`${this.apiUrl}`);
  }

  getUsersByUserName(userName: any) {
    return this.httpClient.get(`${this.apiUrl}/${userName}`);
  }

  AddUser(user: any) {
    //return this.httpClient.post(`${this.apiUrl}users`, user);
    return this.httpClient.post(`${this.apiUrl}`, user);
  }

  isLoggedin() {
    return sessionStorage.getItem('userName');
  }

  isStudent() {
    let role = sessionStorage.getItem('role');
    if (role === 'student') return true;
    else return false;
  }

  // loginService(model: any) {
  //   return this.httpClient.put<any>(`${this.apiLogin}`, model);
  // }

  // loginServiceGet() {
  //   return this.httpClient.get(this.apiLogin);
  // }
}
