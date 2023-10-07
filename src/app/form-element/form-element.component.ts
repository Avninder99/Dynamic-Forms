import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  id: string = uuid();
  formElementGroup: FormGroup;
  type: string = 'text';

  @Input() index: number = -1;
  @Input('defaultData') recievedData: { question: string, type: string, id: string } = { question: '', type: '', id: '' };
  @Output() elementEmitter: EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }> = new EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }>();

  constructor() {
    this.formElementGroup = new FormGroup({});
  }

  ngOnInit() {
    console.log(this.recievedData);
    this.formElementGroup.addControl('id', new FormControl(this.recievedData.id));
    this.formElementGroup.addControl('question', new FormControl(this.recievedData.question));
    this.formElementGroup.addControl('type', new FormControl(this.recievedData.type));
  }

  finalizeElement() {
    this.elementEmitter.emit({ myFormGroup: this.formElementGroup, id: this.recievedData.id, index: this.index });
  }

  getType(): void {
    this.recievedData.type = String(<FormGroup>this.formElementGroup.value.type)
  }




  // checkboxes code
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
}
