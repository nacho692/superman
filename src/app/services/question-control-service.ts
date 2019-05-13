import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../utils/question-base';

@Injectable({
  providedIn: 'root',
})
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any, any>[] ) {
    let group: any = {};

    questions.forEach(question => {
        group[question.key] = question.getForm();
      });
    return new FormGroup(group);
  }
}