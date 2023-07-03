import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit {
  constructor(private examService: ExamService, private router: Router) {}
  exams: any;
  std_id: number | any;
  isFinished: boolean = false;
  ngOnInit(): void {
    console.log('oninit take exam');
    this.examService.getExams().subscribe((res) => {
      this.exams = res;
      console.log(this.exams);
    });
    this.std_id = sessionStorage.getItem('userId');
    // for (let i = 0; i < this.exams.length; i++) {
    //   this.examService
    //     .getGrade(this.std_id, this.exams[i].id)
    //     .subscribe((res) => {
    //       if (res) {
    //         this.exams[i].isFinished = true;
    //       }
    //     });
    // }
  }
  startExam(exam_id: any, e: Event) {
    this.examService.getGrade(this.std_id, exam_id).subscribe((res) => {
      if (res) {
        alert('You have already taken the test');
        e.preventDefault();
        return;
      } else {
        this.router.navigate([`/startExam/${exam_id}`]);
      }
    });
  }
}
