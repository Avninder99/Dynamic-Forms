import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from '../services/response.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-show-response',
  templateUrl: './show-response.component.html',
  styleUrls: ['./show-response.component.css']
})
export class ShowResponseComponent {

  activatedRoute = inject(ActivatedRoute);
  responseService = inject(ResponseService);
  routeService = inject(RouteService);
  router = inject(Router);

  responseData: any;
  responseId: string;
  loading: boolean = true;
  showError: boolean = false;

  ngOnInit() {
    console.log(this.activatedRoute.snapshot);
    this.responseId = this.activatedRoute.snapshot.params['id'];

    console.log(this.responseId);
    this.responseService.fetchResponse(this.responseId).subscribe(
      (res: { 
        createdAt: string, 
        fields: any, 
        submittedBy: string, 
        submittedToWhichForm: {
          question: string
        },
        _id: string
      
      }) => {
        console.log(res);
      },
      (errorRes) => {
        console.log(errorRes);
        alert('An Error Occured');
        this.router.navigate([ this.routeService.getPrevURL() ]);
      }
    )
  }
}
