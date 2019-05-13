import { QuestionBase } from './question-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class TextboxQuestion extends QuestionBase<string, FormControl> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

  getForm(): FormControl {
    return this.required ? new FormControl(this.value || '', Validators.required) 
    : new FormControl(this.value || '');
  }
}