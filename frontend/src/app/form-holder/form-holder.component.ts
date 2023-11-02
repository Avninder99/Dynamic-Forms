import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { FormService } from '../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-holder',
  templateUrl: './form-holder.component.html',
  styleUrls: ['./form-holder.component.css']
})
export class FormHolderComponent {

  dynamicForm: FormGroup;
  showError: boolean = false;
  canSubmitForm: boolean = true;
  route = inject(Router);
  editors: string[] = [];

  constructor(private formService: FormService) {
    this.dynamicForm = new FormGroup({
      formName: new FormControl('Your Dynamic Form'),
      completeForm: new FormArray([
        // first element initiation
        new FormGroup({
          question: new FormControl('', Validators.required),
          type: new FormControl('text', Validators.required),
          id: new FormControl(uuid(), Validators.required),
          answer: new FormControl({ value: '', disabled: true }),
          isRequired: new FormControl(false),
          options: new FormArray([])
        })
      ])
    })
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
        question: new FormControl('', Validators.required),
        type: new FormControl('text', Validators.required),
        id: new FormControl(uuid(), Validators.required),
        answer: new FormControl({ value: '', disabled: true }),
        isRequired: new FormControl(false),
        options: new FormArray([]),
      })
    );
  }

  finalizeForm() {
    // console.log(this.dynamicForm.get('completeForm').value);
    console.log(this.dynamicForm);
    this.showError = false;
    this.canSubmitForm = false;

    if(!this.dynamicForm.valid) {
      alert('Please fill all the fields properly');
      this.canSubmitForm = true;
      return;
    }

    this.formService.saveForm(this.dynamicForm.get('formName').value, this.dynamicForm.get('completeForm').value, this.editors)
    .subscribe(
      (res: { formId: string }) => {
        console.log(res);
        this.route.navigate([ '/forms', res.formId ]);
      },
      (error: { error: { message: string } }) => {
        console.log(error);
        this.showError = true;
        alert(error.error.message);
        this.canSubmitForm = true;
      },
      () => {
        console.log('completed');
      }
    )
  }

  cancelClick(e: Event) {
    e.preventDefault();
  }

  patchEditors(newEditors: string[]) {
    this.editors = newEditors;
    alert('Editors added to form successfully')
  }
}
