import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css'],
})
export class StartExamComponent implements OnInit {
  constructor(
    private examservice: ExamService,
    private activatRoute: ActivatedRoute,
    private rout: Router,
    private userService: UserService
  ) {}
  examid: number | any;
  std_id: number | any;
  g: number = 0;
  isFinished: boolean = false;
  questions: any;
  data: any;
  ngOnInit(): void {
    this.examid = this.activatRoute.snapshot.paramMap.get('id');
    this.examservice.getExamQuestions(this.examid).subscribe((res) => {
      this.questions = res;
      console.log(this.questions);
    });
    this.std_id = sessionStorage.getItem('userId');
    //console.log(sessionStorage.getItem('userId'));
    console.log(this.std_id);
  }

  finishExam(e: Event) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].exam === this.questions[i].cAns) this.g++;
      console.log(this.questions[i].exam);
      console.log(this.questions[i].cAns);
    }
    this.g = (this.g / this.questions.length) * 100;
    this.isFinished = true;
    const model = {
      std_id: this.std_id,
      exam_id: this.examid,
      grade: this.g,
    };
    this.examservice.addGrade(model).subscribe({
      next: (res) => {
        alert('exam is finished successfully');
        this.rout.navigate(['/takeExam']);
        console.log(res);
      },
    });

    //this.rout.navigate(['/home']);
  }
}
