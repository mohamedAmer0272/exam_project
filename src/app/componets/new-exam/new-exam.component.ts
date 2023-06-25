import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css'],
})
export class NewExamComponent {
  constructor(private examServie: ExamService) {}

  inpName: string = '';
  nameFlag: any = false;
  exam: any;
  addName() {
    const model = {
      name: this.inpName,
    };
    console.log(model);
    this.examServie.addExam(model).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          alert('add');
          this.exam = response;
          this.nameFlag = true;
        } else console.log(response);
      },
    });
  }
  questions: any = [];
  addExamForm = new FormGroup({
    body: new FormControl('', [Validators.required]),
    Ans1: new FormControl('', [Validators.required]),
    Ans2: new FormControl('', [Validators.required]),
    Ans3: new FormControl('', [Validators.required]),
    Ans4: new FormControl('', [Validators.required]),
    CAns: new FormControl(''),
  });

  addQuestion() {
    if (this.addExamForm.valid) {
      const model = {
        body: this.addExamForm.value.body,
        choice1: this.addExamForm.value.Ans1,
        choice2: this.addExamForm.value.Ans2,
        choice3: this.addExamForm.value.Ans3,
        choice4: this.addExamForm.value.Ans4,
        CAns: this.addExamForm.value.CAns,
        ExamID: this.exam.id,
      };
      console.log(model);
      this.questions.push(model);
      this.addExamForm.setValue({
        body: '',
        Ans1: '',
        Ans2: '',
        Ans3: '',
        Ans4: '',
        CAns: '',
      });
    }
  }

  saveExam() {
    for (let i = 0; i < this.questions.length; i++) {
      console.log(this.questions[i]);
      this.examServie.addQuestions(this.questions[i]).subscribe({
        next: (res) => {
          alert('save success');
        },
      });
    }
  }
}
