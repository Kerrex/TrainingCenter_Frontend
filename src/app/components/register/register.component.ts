import { Component, OnInit } from '@angular/core';
import { User } from '../../beans/user';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  object = Object;
  firstFormSubmitted: boolean = false;
  secondFormSubmitted: boolean = false;
  user: User = new User();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepControl: any;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      username: new FormControl(this.user.username, Validators.required, this.isUsernameTakenValidator()),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)])
    });
    this.secondFormGroup = this.formBuilder.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email], this.isEmailTakenValidator()),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName)
    });
  }

  register() {
    //TODO
  }
  private isUsernameTakenValidator() {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      return this.userService.isUserNameOrEmailTaken(control.value).map(response => {
        if (response['result'] == "true") {
          return {'usernameTaken': 'Username already taken!'}
        } else {
          return null;
        }
      });
    }
  }

  private isEmailTakenValidator() {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      return this.userService.isUserNameOrEmailTaken(control.value).map(response => {
        if (response['result'] == "true") {
          return {'emailTaken': 'Email already taken!'}
        } else {
          return null;
        }
      });
    }
  }

  submitFirstForm() {
    this.firstFormSubmitted = true;
    if (this.firstFormGroup.valid) {
      this.user.username = this.firstFormGroup.get('username').value;
      this.user.password = this.firstFormGroup.get('password').value;
    } else {
      console.log(this.firstFormGroup.controls['username'].errors);
      console.log(this.firstFormGroup.controls['password'].errors);
    }
  }

  submitSecondForm() {
    this.secondFormSubmitted = true;
    if (this.secondFormGroup.valid) {
      this.user.email = this.secondFormGroup.get('email').value;
      this.user.firstName = this.secondFormGroup.get('firstName').value;
      this.user.lastName = this.secondFormGroup.get('lastName').value;
    } else {
      console.log(this.secondFormGroup.controls['email'].errors);
      console.log(this.secondFormGroup.controls['firstName'].errors);
      console.log(this.secondFormGroup.controls['lastName'].errors);
    }

    this.userService.register(this.user)
  }

}
