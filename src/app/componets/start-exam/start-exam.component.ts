import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css'],
})
export class StartExamComponent implements OnInit {
  constructor(
    private examservice: ExamService,
    private activatRoute: ActivatedRoute,
    private rout: Router
  ) {}
  id: number | any;
  questions: any;
  ngOnInit(): void {
    this.id = this.activatRoute.snapshot.paramMap.get('id');
    this.examservice.getExamQuestions(this.id).subscribe((res) => {
      this.questions = res;
      console.log(this.questions);
    });
  }

  finishExam() {
    this.rout.navigate(['/home']);
  }
}
