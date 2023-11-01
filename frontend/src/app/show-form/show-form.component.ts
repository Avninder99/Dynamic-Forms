import { Component, inject } from '@angular/core';
import { RouteService } from '../services/route.service';
import { FormService } from '../services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from '../services/response.service';
import { environment } from 'src/environments/environment';

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

  currentURL: String = '';
  formId: String = '';
  fetchedForm: any = null;
  loading: Boolean = true;
  showError: Boolean = false;
  dynamicForm: FormGroup = null;
  canSubmitForm: Boolean = true;
  chatOpened: Boolean = false;

  // constructor() {

  // }
  
  ngOnInit() {

    this.route.params.subscribe(
      (params: { id: string }) => {
        console.log(params);

        this.currentURL = '';
        this.formId = '';
        this.fetchedForm = null;
        this.loading = true;
        this.showError = false;
        this.dynamicForm = null;
        this.canSubmitForm = true;
        this.chatOpened = false;

        this.dynamicForm = new FormGroup({
          formName: new FormControl('', Validators.required),
          completeResponse: new FormArray([])
        })

        this.currentURL = this.routeService.getCurrentURL();
        this.formId = params.id;

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
        this.canSubmitForm = true;
      } else {
        console.log(this.dynamicForm.get('formName').value);
        this.responseService.saveResponse(this.dynamicForm.get('completeResponse').value, this.formId).subscribe(
          (res: { message: string, responseId: string }) => {
            console.log(res);
            alert('Form submitted successfully');
            this.router.navigate([ '/response', res.responseId ]);
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

  openChat(e: Event) {
    e.preventDefault();
    this.chatOpened = true;
  }
  
  closeChat() {
    this.chatOpened = false;
  }
}
