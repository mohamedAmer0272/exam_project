import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  //apiurl: string = 'http://localhost:3000/exam';
  apiurl: string = 'https://localhost:7235/api/Exam';
  apiQues: string = 'https://localhost:7235/api/Question';
  constructor(private httpclient: HttpClient) {}

  getExams() {
    return this.httpclient.get(this.apiurl);
  }
  addExam(model: any) {
    return this.httpclient.post(this.apiurl, model);
  }

  addQuestions(model: any) {
    return this.httpclient.post(this.apiQues, model);
  }

  getExamQuestions(id: number) {
    return this.httpclient.get(`${this.apiQues}/${id}`);
  }
  getExamById(id: number) {
    return this.httpclient.get(`${this.apiurl}/${id}`);
  }
}
