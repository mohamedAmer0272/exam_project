import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  users: any = [];
  emailFlag: any;
  FormisValid: any;
  constructor(private userService: UserService, private route: Router) {}
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsersAll('users').subscribe({
      next: (Response) => {
        this.users = Response;
        console.log(this.users);
      },
      error: (Error) => {
        console.log(this.users);
      },
    });
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get emailControl() {
    return this.registerForm.controls.email;
  }
  get usernameControl() {
    return this.registerForm.controls.username;
  }
  get passwordControl() {
    return this.registerForm.controls.password;
  }
  get CpasswordControl() {
    return this.registerForm.controls.ConfirmPassword;
  }
  onSubmit(e: any) {
    this.emailFlag = true;
    if (this.registerForm.valid) {
      let model = {
        email: this.emailControl.value,
        userName: this.usernameControl.value,
        password: this.passwordControl.value,
        role: 'student',
      }; //end of model object
      console.log(model);
      let index = this.users.findIndex((u: any) => {
        return u.email === this.emailControl.value;
      }); // end of index
      console.log(index);
      console.log(this.users);
      if (index === -1) {
        this.userService.AddUser(model).subscribe({
          next: (Response) => {
            alert('registeration success');
            this.emailFlag = true;
            this.route.navigate(['/home']);
          },
        });
      } else {
        //e.preventDefault();
        console.log('no');
        this.emailFlag = false;
      }
    } else {
      this.FormisValid = false;
    }
  }
}
