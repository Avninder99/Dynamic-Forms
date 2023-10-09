import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-form-holder',
  templateUrl: './form-holder.component.html',
  styleUrls: ['./form-holder.component.css']
})
export class FormHolderComponent {

  dynamicForm: FormGroup;

  constructor() {
    this.dynamicForm = new FormGroup({
      formName: new FormControl('Your Dynamic Form'),
      completeForm: new FormArray([
        new FormGroup({
          question: new FormControl(''),
          type: new FormControl('dropdown'),
          id: new FormControl(uuid()),
          answer: new FormControl(''),
          isRequired: new FormControl(false),
          options: new FormControl([])
        })
      ])
    })
  }
  
  elementEmitterHandler(element: { myFormGroup: FormGroup, id: string, index: number }) {
    console.log(element);
    console.log(element.myFormGroup.value);
    const values = (<FormArray>this.dynamicForm.get('completeForm')).value;
    const foundIndex = values.findIndex((value: { id: string }) => value.id === element.id);

    console.log(foundIndex);
    
    (<FormArray>this.dynamicForm.get('completeForm')).get(String(foundIndex))?.patchValue(element.myFormGroup.value);
  }
  
  deleteElementHandler(element: { id: string }) {
    const values = (<FormArray>this.dynamicForm.get('completeForm')).value;
    const foundIndex = values.findIndex((value: { id: string }) => value.id === element.id);
    (<FormArray>this.dynamicForm.get('completeForm')).removeAt(foundIndex);
  }
  
  addNewField(e: Event) {
    e.preventDefault();
    (<FormArray>this.dynamicForm.get('completeForm')).push(
      new FormGroup({
        question: new FormControl(''),
        type: new FormControl('text'),
        id: new FormControl(uuid()),
        answer: new FormControl(''),
        isRequired: new FormControl(false),
        options: new FormControl([]),
      })
    );
  }

  finalizeForm() {
    console.log(this.dynamicForm);
  }
}
