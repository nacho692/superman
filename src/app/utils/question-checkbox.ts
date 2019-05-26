import { QuestionBase } from './question-base';
import { FormControl, Validators } from '@angular/forms';

export class CheckboxQuestion extends QuestionBase<boolean, FormControl> {
  controlType = 'checkbox';

  constructor(options: {} = {}) {
    super(options);
  }

  getForm(): FormControl {
    return this.required ? new FormControl(this.value || '', Validators.required) 
    : new FormControl(this.value || '');
  }
}