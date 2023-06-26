import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { AboutComponent } from './componets/about/about.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { StudentComponent } from './componets/student/student.component';
import { NewExamComponent } from './componets/new-exam/new-exam.component';
import { TakeExamComponent } from './componets/take-exam/take-exam.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users/:id', component: HomeComponent },
  { path: 'admin/:id', component: HomeComponent },
  { path: 'addExam', component: NewExamComponent },
  { path: 'takeExam', component: TakeExamComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
