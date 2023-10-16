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
  showError: Boolean = false;
  canSubmitForm: Boolean = true;
  route = inject(Router);

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

    this.formService.saveForm(this.dynamicForm.get('formName').value, this.dynamicForm.get('completeForm').value)
    .subscribe(
      (res: { formId: String }) => {
        console.log(res);
        this.route.navigate([ '/forms', res.formId ]);
      },
      (error) => {
        console.log(error);
        this.showError = true;
        this.canSubmitForm = true;
      },
      () => {
        console.log('completed');
      }
    )
  }
}
