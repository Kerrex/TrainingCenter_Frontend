import { Injectable } from '@angular/core';
import { escape } from 'querystring';
import { JwtUtils } from './jwt-utils.service';
import { User } from '../beans/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers": "Content-Type"
  })
};

@Injectable()
export class UserService {
  accessToken: string;
  private isAdmin: boolean;

  constructor(private jwtUtils: JwtUtils, private http: HttpClient) {
    const authToken = localStorage.getItem("access_token")
    if (authToken != null) {
      this.accessToken = authToken;
      const decodedToken = this.jwtUtils.decodeToken(authToken);
      this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    }
  }

  login(accessToken: string) {
    const decodedToken = this.jwtUtils.decodeToken(accessToken);
    
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;

    localStorage.setItem("access_token", accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem("access_token");
  }

  register(user: User) {
    const userJson = JSON.stringify(user);
    return this.http.post(AuthenticationService.API_HOST + "register", userJson, httpOptions).subscribe();
  }

  isUserNameOrEmailTaken(username: string) {
    return this.http.post(AuthenticationService.API_HOST + "register/is_username_taken", 
                          JSON.stringify({'username': username}), 
                          httpOptions);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return !!this.accessToken;
  }

  getCurrentUserData(): Observable<User> {
    return this.http.get<User>(AuthenticationService.API_HOST + "currentUserData", httpOptions);
  }
}
