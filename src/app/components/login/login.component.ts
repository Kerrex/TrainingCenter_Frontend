import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.userService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      response => {
        const authToken = response['access_token'];
        if (authToken) {
          this.userService.login(authToken);
          this.navigateAfterSuccess();
        } else {
          this.error = 'Username or password is incorrect!';
        }
      },
      error => {
        this.error = 'Username or password is incorrect!';
        this.loading = false;
      })
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

}
