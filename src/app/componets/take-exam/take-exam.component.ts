import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit {
  constructor(private examService: ExamService) {}
  exams: any;
  ngOnInit(): void {
    console.log('oninit take exam');
    this.examService.getExams().subscribe((res) => {
      this.exams = res;
      console.log(this.exams);
    });
  }
  startExam() {}
}
