import { Component, inject } from '@angular/core';
import { RouteService } from '../services/route.service';
import { FormService } from '../services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent {
  routeService = inject(RouteService);
  formService = inject(FormService);
  responseService = inject(ResponseService);
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
      formName: new FormControl('', Validators.required),
      completeResponse: new FormArray([])
    })
  }

  ngOnInit() {
    this.currentURL = this.routeService.getCurrentURL();
    this.formId = this.route.snapshot.params['id'];

    this.formService.fetchFormBasic(this.formId)
    .subscribe(
      (res: { message: String, form: any }) => {
        console.log(res);
        this.fetchedForm = res.form;
        this.canSubmitForm = (res.form.mode === 'active');
        this.dynamicForm.get('formName').setValue(this.fetchedForm.title)
        this.fetchedForm.fields.forEach((field) => {
          this.addField(field)
        });
        this.loading = false;
      },
      (res) => {
        console.log(res);
        this.showError = true;
        this.loading = false;
      }
    )
  }

  addField(data: { question: String, id: String, type: String, isRequired: Boolean, options: String[] }) {

    const optionsHolder: FormArray = new FormArray([]);

    data.options.forEach((option: String) => {
      optionsHolder.push(
        new FormControl(option, Validators.required)
      )
    });

    (<FormArray>this.dynamicForm.get('completeResponse')).push(
      new FormGroup({
        question: new FormControl(data.question),
        answer: new FormControl('', data.isRequired ? Validators.required : []),
        id: new FormControl(data.id),
        // type: new FormControl(data.type),
        // isRequired: new FormControl(data.isRequired),
        options: optionsHolder,
      })
    );
  }

  submitResponse() {
    console.log(this.dynamicForm);
    if(this.fetchedForm.mode !== 'active') {
      alert('This form is not yet accepting responses');
    }
    else {
      this.showError = false;
      this.canSubmitForm = false;
  
      if(!this.dynamicForm.valid) {
        alert("Please fill all the fields properly");
      } else {
        console.log(this.dynamicForm.get('formName').value);
        this.responseService.saveResponse(this.dynamicForm.get('completeResponse').value, this.formId).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate([ '/forms', this.formId ]);
          },
          (error) => {
            console.log(error);
            this.canSubmitForm = true;
            this.showError = true;
          }
        )
      }
    }
  }

  cancelClick(e: Event) {
    e.preventDefault();
  }
}
