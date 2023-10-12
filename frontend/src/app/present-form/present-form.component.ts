import { Component, inject } from '@angular/core';
import { RouteService } from '../services/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-present-form',
  templateUrl: './present-form.component.html',
  styleUrls: ['./present-form.component.css']
})
export class PresentFormComponent {
  routeService = inject(RouteService);
  formService = inject(FormService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  currentURL: String;
  formId: String;
  fetchedForm: any;
  loading: Boolean = true;
  showError: Boolean = false;
  dynamicForm: FormGroup;
  canSubmitForm: Boolean = true;

  constructor() {
    this.dynamicForm = new FormGroup({
      completeResponse: new FormArray([])
    })
  }

  ngOnInit() {
    this.currentURL = this.routeService.getCurrentURL();
    this.formId = this.route.snapshot.params['id'];

    this.formService.fetchForm(this.formId)
    .subscribe(
      (res: { message: String, form: any }) => {
        console.log(res);
        this.fetchedForm = res.form;
        this.loading = false;




        // this.dynamicForm = new FormGroup({
        //   completeResponse: new FormArray([])
        // })


        this.fetchedForm.fields.forEach((field) => {
          this.addField(field)
        });




      },
      (error) => {
        console.log(error);
        this.showError = true;
      },
      () => {

      }
    )
  }

  addField(data: { question: String, id: String, type: String, isRequired: Boolean, options: String[] }) {
    (<FormArray>this.dynamicForm.get('completeResponse')).push(
      new FormGroup({
        question: new FormControl(data.question, Validators.required),
        type: new FormControl(data.type, Validators.required),
        id: new FormControl(data.id, Validators.required),
        answer: new FormControl(''),
        isRequired: new FormControl(data.isRequired),
        options: new FormControl(data.options),
      })
    );
  }


  elementEmitterHandler(element: { myFormGroup: FormGroup, id: string, index: number }) {
    console.log(element);
    console.log(element.myFormGroup.value);
    // const values = (<FormArray>this.dynamicForm.get('completeForm')).value;
    // const foundIndex = values.findIndex((value: { id: string }) => value.id === element.id);

    // console.log(foundIndex);
    
    // (<FormArray>this.dynamicForm.get('completeForm')).get(String(foundIndex))?.patchValue(element.myFormGroup.value);
  }

  submitResponse() {
    console.log(this.dynamicForm);
    this.showError = false;
    this.canSubmitForm = false;

    // this.formService.saveForm(this.dynamicForm.get('formName').value, this.dynamicForm.get('completeForm').value)
    // .subscribe(
    //   (res: { formId: String }) => {
    //     console.log(res);
    //     this.router.navigate([ '/forms', res.formId ]);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.showError = true;
    //     this.canSubmitForm = true;
    //   },
    //   () => {
    //     console.log('completed');
    //   }
    // )
  }
}
