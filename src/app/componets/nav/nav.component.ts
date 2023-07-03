import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  data: any = null;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    console.log(this.data);
    this.userService.user.subscribe({
      next: (Response) => {
        this.data = Response;
        console.log(this.data);
      },
    });
  }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('role');
    this.data = null;
  }
}

// const model = {
//   username: '',
//   role: '',
// };
// this.data = null;
// this.userService.loginService(model).subscribe();
