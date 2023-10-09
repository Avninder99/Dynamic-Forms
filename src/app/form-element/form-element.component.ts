import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import {ThemePalette} from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent {
  // id: string = uuid();
  formElementGroup: FormGroup;
  // type: string = 'text';

  @Input() index: number = -1;
  // yet to finalize
  @Input('defaultData') recievedData: { question: string, type: string, id: string, answer: string | string[], isRequired: boolean, options: string[] } = { question: '', type: '', id: '', answer: '', isRequired: false, options: ['option 1'] };
  
  @Output() elementEmitter: EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }> = new EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }>();
  @Output() deleteElementEmitter: EventEmitter<{ id: string }> = new EventEmitter<{ id: string }>();

  constructor() {
    this.formElementGroup = new FormGroup({});
  }

  ngOnInit() {
    console.log(this.recievedData);
    this.formElementGroup.addControl('id', new FormControl(this.recievedData.id));
    this.formElementGroup.addControl('question', new FormControl(this.recievedData.question));
    this.formElementGroup.addControl('type', new FormControl(this.recievedData.type));
    this.formElementGroup.addControl('answer', new FormControl(this.recievedData.answer));
    this.formElementGroup.addControl('options', new FormControl(this.recievedData.options));
    this.formElementGroup.addControl('isRequired', new FormControl(this.recievedData.isRequired));
  }

  finalizeElement() {
    this.elementEmitter.emit({ myFormGroup: this.formElementGroup, id: this.recievedData.id, index: this.index });
  }

  deleteElement(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.deleteElementEmitter.emit({ id: this.recievedData.id })
  }

  getType(): void {
    this.recievedData.type = String(<FormGroup>this.formElementGroup.value.type)
    if(this.recievedData.type === 'radioButtons'){
      console.log('Radio Buttons selected')
      this.formElementGroup.addControl('options', new FormArray([

      ]))
    }
  }

  // yet to change
  answerAndOptionsHandler(e: { answer: FormControl, options: string[] }) {
    // console.log('hi')
    // console.log(e.answer.value);
    // this.formElementGroup.get('answer')?.setValue(e.answer.value);
  }

  optionsEmitterHandler(e: FormArray) {
    console.log(e.value);
    // this.formElementGroup.get('options')
    this.formElementGroup.get('options').setValue(e.value);
  }
}
