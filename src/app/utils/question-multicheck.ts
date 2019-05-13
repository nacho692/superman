import { QuestionBase } from './question-base';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Options } from 'selenium-webdriver/edge';
import { groupBy } from 'rxjs/internal/operators/groupBy';

export class MulticheckQuestion extends QuestionBase<Map<string, boolean>, FormGroup> {
  controlType = 'multicheck';
  options: {key: string, name: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || '';
  }

  getForm(): FormGroup {
    let group = {};
    this.options.forEach(check => group[check.key] = new FormControl(false));
    return new FormGroup(group);
  }
}