import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { JwtUtils } from '../services/jwt-utils.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService, private jwtUtils: JwtUtils) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.tokenNotExpired(this.userService.accessToken)) {
        return true;
      } else {
        this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
        return false;
      }
  }

  tokenNotExpired(jwt?:string): boolean {
    
      const token: string = jwt;
    
      return token != null && !this.jwtUtils.isTokenExpired(token);
    }
}
