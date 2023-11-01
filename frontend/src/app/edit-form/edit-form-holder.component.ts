import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { RouteService } from '../services/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-edit-form-holder-form',
  templateUrl: './edit-form-holder.component.html',
  styleUrls: ['./edit-form-holder.component.css']
})
export class EditFormHolderComponent implements OnInit, OnDestroy {
  routeService = inject(RouteService);
  formService = inject(FormService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  currentURL: String;
  formId: string;
  fetchedForm: any;
  loading: Boolean = true;
  showError: Boolean = false;
  errorMessage: String = 'An Error Occured'
  dynamicForm: FormGroup;
  canSubmitForm: Boolean = true;
  loaded: boolean = false;

  constructor() {
    this.dynamicForm = new FormGroup({
      formName: new FormControl('', Validators.required),
      completeForm: new FormArray([])
    })
  }

  ngOnInit() {
    this.loaded = false;
    this.currentURL = this.routeService.getCurrentURL();
    this.formId = this.route.snapshot.params['id'];

    this.formService.fetchFormComplete(this.formId)
    .subscribe(
      (res: { message: String, form: any }) => {
        console.log(res);
        if(res.form.mode !== 'draft') {
          alert("Form can't be updated, as it is not in draft stage anymore !");
          this.router.navigate([ this.routeService.getPrevURL() ])
        }
        else {
          this.fetchedForm = res.form;
          this.dynamicForm.get('formName').setValue(this.fetchedForm.title)
          this.fetchedForm.fields.forEach((field) => {
            this.addField(field)
          });
          this.loading = false;
          this.loaded = true;
        }
      },
      (res) => {
        console.log(res);
        this.errorMessage = res.error.message;
        this.showError = true;
        this.loading = false;
      }
    )
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

  addField(data: { question: String, id: String, type: String, isRequired: Boolean, options: String[] }) {

    const optionsHolder: FormArray = new FormArray([]);

    data.options.forEach((option: String) => {
      optionsHolder.push(
        new FormControl(option, Validators.required)
      )
    });

    (<FormArray>this.dynamicForm.get('completeForm')).push(
      new FormGroup({
        question: new FormControl(data.question, Validators.required),
        type: new FormControl(data.type, Validators.required),
        id: new FormControl(data.id, Validators.required),
        answer: new FormControl({ value: '', disabled: true }),
        isRequired: new FormControl(data.isRequired),
        options: optionsHolder,
      })
    );
  }

  submitUpdatedForm() {
    console.log(this.dynamicForm);
    this.showError = false;
    this.canSubmitForm = false;

    if(!this.dynamicForm.valid) {
      alert("Please fill all the fields properly");
    } else {
      console.log(this.dynamicForm.get('formName').value)
      this.formService.updateForm(this.dynamicForm.get('formName').value, this.dynamicForm.get('completeForm').value, this.formId)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate([ '/forms', this.formId ]);
        },
        (error) => {
          console.log(error);
          this.showError = true;
          this.canSubmitForm = true;
        }
      )
    }
  }

  cancelClick(e: Event) {
    e.preventDefault();
  }

  patchEditors(newEditors: string[]) {
    this.formService.patchFormEditors(newEditors, this.formId).subscribe(
      (res: { message: string }) => {
        console.log(res);
        alert(res.message);
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )
  }

  ngOnDestroy() {
    console.log('unload called');
    this.unloadTransmitter();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadTransmitter() {
    if(this.loaded) {
      this.formService.unloadTransmitter(this.formId).subscribe(
        (res) => {
          console.log(res);
        }
      );
    }
  }
}
