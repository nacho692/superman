import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {}

  login(username: string, password: string): Observable<boolean> {
    if (username == "admin" && password == "admin") {
      localStorage.setItem('currentUser', JSON.stringify({user: "admin", token: "xxx", role: "admin"}));
      return of(true);
    }
    return of(false);
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

  isAdmin(): boolean {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    return (user != null && user.role == "admin")  
  }

  getCaller(): string {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    return user? user.role: "user";
  }

  getToken(): string {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    return "tokensin";
  }
}
