import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   *
   */
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getuser();
  }

  getuser() {
    this.userService.getUsersAll(this.type).subscribe({
      next: (Response) => {
        this.users = Response;
        console.log('fetch');
        console.log(this.users);
      },
    });
  }
  users: any = [];
  type = 'users';
  loginFlag: any;
  loginU: any;
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl(this.type),
  }); //end of form group

  get usernameControl() {
    return this.loginForm.controls.userName;
  }
  get passwordControl() {
    return this.loginForm.controls.password;
  }
  get typeControl() {
    return this.loginForm.controls.type;
  }

  formSubmit(e: any) {
    if (this.loginForm.valid) {
      let loginUser = this.users.find((u: any) => {
        return (
          u.userName === this.usernameControl.value &&
          u.password === this.passwordControl.value
        );
      }); // end of index
      console.log('login user ' + loginUser);
      if (loginUser) {
        const model = {
          username: this.usernameControl.value,
          role: loginUser.role,
        };

        this.userService.loginService(model).subscribe({
          next: (Response) => {
            if (Response) {
              this.userService.user.next(Response);
              alert('Login Successfull');
              this.router.navigate([`${this.type}/${loginUser.id}`]);
              this.loginFlag = true;
            }
          },
        });
      } else {
        this.loginFlag = false;
        console.log('no');
      }
    }
  }
}
