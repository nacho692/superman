import { Component, Input, OnInit, EventEmitter, Output }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase } from 'src/app/utils/question-base';
import { QuestionControlService } from 'src/app/services/question-control-service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: QuestionBase<any, any>[] = [];
  @Output() formSubmit = new EventEmitter<JSON>();
  
  form: FormGroup;
  payLoad = '';
 
  constructor(private qcs: QuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }
}