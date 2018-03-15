import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const TOKEN_AUTH_PASSWORD = 'XY7kmzoNzl100';
const TOKEN_AUTH_USERNAME = 'testjwtclientid';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)}`
  })
};



@Injectable()
export class AuthenticationService {
  static API_HOST = 'http://localhost:8080/';
  static AUTH_TOKEN = AuthenticationService.API_HOST + 'oauth/token';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    return this.httpClient.post(AuthenticationService.AUTH_TOKEN, body, httpOptions);
  }

}
