import { Component, Input, OnInit, EventEmitter, Output }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase } from 'src/app/utils/question-base';
import { QuestionControlService } from 'src/app/services/question-control-service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
 
  _questions: QuestionBase<any, any>[];
  @Input()
  set questions(questions: QuestionBase<any, any>[]) {
    this._questions = questions;
    this.form = this.qcs.toFormGroup(this._questions);
  }

  @Output() formSubmit = new EventEmitter<JSON>();
  
  form: FormGroup;
  payLoad = '';
 
  constructor(private qcs: QuestionControlService) {  }
 
  ngOnInit() {
  }
 
  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }
}