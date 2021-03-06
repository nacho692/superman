import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase } from 'src/app/utils/question-base';


@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any, any>;
  @Input() form: FormGroup;
  get isValid() { 
    return this.form.controls[this.question.key].valid; 
  }
}