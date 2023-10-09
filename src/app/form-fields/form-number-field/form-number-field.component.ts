import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.css']
})
export class FormNumberFieldComponent {
  answerHolder: FormGroup;
  options: string[] = [];
  @Output() answerAndOptionsEmitter: EventEmitter<{ answer: FormControl, options: string[] }> = new EventEmitter<{ answer: FormControl, options: string[] }>()

  constructor() {
    this.answerHolder = new FormGroup({
      answer: new FormControl({ value: 0, disabled: true })
    });
  }

  ngAfterContentInit() {
    console.log(this.answerHolder.get('answer'))
    // this.answerAndOptionsEmitter.emit({ answer: <FormControl>this.answerHolder.get('answer'), options: this.options })
  }
}
