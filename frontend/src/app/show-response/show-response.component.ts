import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from '../services/response.service';
import { RouteService } from '../services/route.service';
import { Form } from '../interfaces/form';
import { Response } from '../interfaces/response';

@Component({
  selector: 'app-show-response',
  templateUrl: './show-response.component.html',
  styleUrls: ['./show-response.component.css']
})
export class ShowResponseComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  responseService = inject(ResponseService);
  routeService = inject(RouteService);
  router = inject(Router);

  responseData: Response;
  formData: Form;
  responseId: string;
  loading: boolean = true;
  showError: boolean = false;

  ngOnInit() {
    console.log(this.activatedRoute.snapshot);
    this.responseId = this.activatedRoute.snapshot.params['id'];

    console.log(this.responseId);
    this.responseService.fetchResponse(this.responseId).subscribe(
      (res: {
        message: string,
        response: Response,
        form: Form
      }) => {
        console.log(res);
        this.responseData = res.response;
        this.formData = res.form;
        this.loading = false;
      },
      (errorRes) => {
        console.log(errorRes);
        alert('An Error Occured');
        this.router.navigate([ '/' ]);
      }
    )
  }

  goBackToForm() {
    this.router.navigate([ '/forms', this.formData._id ]);
  }
}
