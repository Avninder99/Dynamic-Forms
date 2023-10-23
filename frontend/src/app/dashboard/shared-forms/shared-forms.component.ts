import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-shared-forms',
  templateUrl: './shared-forms.component.html',
  styleUrls: ['./shared-forms.component.css']
})
export class SharedFormsComponent {
  formService = inject(FormService);
  router = inject(Router)

  myForms: { _id: string, title: string, editors: number, responses: number, createdAt: string, mode: string }[] = [];
  loading: Boolean = true;
  showError: Boolean = false;

  ngOnInit() {
    this.formService.fetchSharedWithMeForms().subscribe(
      (res: { message: string, forms: { _id: string, title: string, editors: number, responses: number, createdAt: string, mode: string }[] }) => {
        console.log(res);
        this.myForms = res.forms;
        // console.log(this.myForms)
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.showError = true;
        console.log(error);
      }
    )
  }

  showForm(id: string) {
    this.router.navigate([ '/forms/', id ]);
  }

  showResponses() {

  }

  editForm(id: string) {
    this.router.navigate([ '/forms/', id, 'edit']);
  }
}
