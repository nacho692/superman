import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      console.log(user)
      if (user !== null) {
        this.login(user.id, user.idToken);
      } else {
        this.logout();
      }
    });
  }

  ngOnInit() {
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private login(id: string, token: string) {
    localStorage.setItem('currentUser', JSON.stringify({id: id, token: token, role: "admin"}));
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.authService.signOut();
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
    return user? user.token: "";
  }
}
