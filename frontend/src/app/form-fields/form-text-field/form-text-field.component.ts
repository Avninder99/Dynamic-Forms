import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.css']
})
export class FormTextFieldComponent {

  answerHolder: FormGroup;
  options: string[] = [];
  @Output() optionsEmitter: EventEmitter<{ answer: FormControl, options: string[] }> = new EventEmitter<{ answer: FormControl, options: string[] }>()

  constructor() {
    this.answerHolder = new FormGroup({
      answer: new FormControl({ value: '', disabled: true })
    });
  }

  ngAfterContentInit() {
    this.optionsEmitter.emit({ answer: <FormControl>this.answerHolder.get('answer'), options: this.options })
  }
}
