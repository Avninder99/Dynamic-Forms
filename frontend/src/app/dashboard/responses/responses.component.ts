import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent {
  responseService = inject(ResponseService);
  router = inject(Router);
  loading: Boolean = true;
  showError: Boolean = false;
  myResponses: { formTitle: string, createdAt: string, formId: string, _id: string }[];

  ngOnInit() {
    this.responseService.fetchMyResponses().subscribe(
      (res: { message: string, responses: { formTitle: string, createdAt: string, formId: string, _id: string }[] }) => {
        console.log(res);
        this.myResponses = res.responses;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.showError = true;
        console.log(error);
      }
    )
  }

  showResponse(id: string) {
    return this.router.navigate([ '/response', id ]);
  }

  showForm(id: string) {
    return this.router.navigate([ '/forms', id ]);
  }
}
