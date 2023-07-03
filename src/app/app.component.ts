import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) {}
  // ngOnInit(): void {
  //   this.userService.getUsersAll('login').subscribe((res) => {
  //     this.userService.user.next(res);
  //   });
  // }
  data: any;

  title = 'project';
}
