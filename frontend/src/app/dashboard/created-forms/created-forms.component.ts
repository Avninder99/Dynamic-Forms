import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-created-forms',
  templateUrl: './created-forms.component.html',
  styleUrls: ['./created-forms.component.css']
})
export class CreatedFormsComponent implements OnInit {
  formService = inject(FormService);
  router = inject(Router)

  myForms: { _id: string, title: string, editors: number, responses: number, createdAt: string, mode: string }[] = [];
  loading: boolean = true;
  showError: boolean = false;

  ngOnInit() {
    this.formService.fetchMyForms().subscribe(
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

  showResponses(id: string) {
    this.router.navigate([ '/forms', id, 'responses' ]);
  }

  editForm(id: string) {
    this.router.navigate([ '/forms/', id, 'edit']);
  }

  switchFormMode(newMode: string, id: string, index: number) {
    console.log(newMode, id);
    this.formService.switchMode(id, newMode).subscribe(
      (res: { message: string, mode: string}) => {
        console.log(res.mode);
        this.myForms[index].mode = res.mode;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
