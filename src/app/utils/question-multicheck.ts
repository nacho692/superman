import { QuestionBase } from './question-base';
import { FormControl, FormGroup } from '@angular/forms';

export class MulticheckQuestion extends QuestionBase<Map<string, boolean>, FormGroup> {
  controlType = 'multicheck';
  options: {key: string, name: string, value: boolean}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || '';
  }

  getForm(): FormGroup {
    let group = {};
    this.options.forEach(check => group[check.key] = 
      new FormControl(check.value? check.value : false));
    return new FormGroup(group);
  }
}