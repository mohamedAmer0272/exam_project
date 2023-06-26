import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any;
  flag: any;
  constructor(private userservice: UserService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userservice.loginServiceGet().pipe(
      map((response: any) => {
        const user = response;
        if (user?.role === 'student') {
          console.log(user);
          return true;
        } else {
          console.log(user);
          this.route.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
