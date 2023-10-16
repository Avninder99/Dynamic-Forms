import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-created-forms',
  templateUrl: './created-forms.component.html',
  styleUrls: ['./created-forms.component.css']
})
export class CreatedFormsComponent {
  formService = inject(FormService);

  myForms: { title: string, editors: number, responses: number, createdAt: string }[] = [];
  loading: Boolean = true;
  showError: Boolean = false;

  ngOnInit() {
    this.formService.fetchMyForms().subscribe(
      (res: { message: string, forms: { title: string, editors: number, responses: number, createdAt: string }[] }) => {
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
}
