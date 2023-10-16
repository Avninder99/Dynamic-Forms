import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { v4 as uuid } from 'uuid';

import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {
  // formElementGroup: FormGroup;

  @Input() index: number = -1;
  // yet to finalize
  // @Input('defaultData') recievedData: { question: string, type: string, id: string, answer: string | string[], isRequired: boolean, options: string[] } = { question: '', type: '', id: '', answer: '', isRequired: false, options: ['option 1'] };
  @Input() elementGroup: FormGroup;
  
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
    // this.formElementGroup = new FormGroup({});
  }

  ngOnInit() {
    // console.log(this.recievedData);
    // this.formElementGroup.addControl('id', new FormControl(this.recievedData.id, Validators.required));
    // this.formElementGroup.addControl('question', new FormControl(this.recievedData.question, Validators.required));
    // this.formElementGroup.addControl('type', new FormControl(this.recievedData.type, Validators.required));
    // this.formElementGroup.addControl('answer', new FormControl(this.recievedData.answer));
    // this.formElementGroup.addControl('options', new FormControl(this.recievedData.options));
    // this.formElementGroup.addControl('isRequired', new FormControl(this.recievedData.isRequired));
  }

  finalizeElement() {
    if(this.elementGroup.valid){
      this.elementEmitter.emit({ myFormGroup: this.elementGroup, id: 'placeholder_for_now', index: this.index });
    }else{
      alert('Please fill all the created fields properly')
    }
  }

  deleteElement(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.deleteElementEmitter.emit({ id: this.elementGroup.value.id })
  }

  getType(): void {
    // this.elementGroup.value.type = String(<FormGroup>this.elementGroup.value.type)
    if(this.elementGroup.value.type === 'radioButtons'){
      console.log('Radio Buttons selected')
        this.elementGroup.addControl('options', new FormArray([
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
    // this.elementGroup.get('options').setValue(e.value);
  }
}
