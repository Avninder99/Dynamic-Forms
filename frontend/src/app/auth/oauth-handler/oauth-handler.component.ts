import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-oauth-handler',
  templateUrl: './oauth-handler.component.html',
  styleUrls: ['./oauth-handler.component.css']
})
export class OauthHandlerComponent {
  route = inject(ActivatedRoute);
  tokenService = inject(TokenService);
  router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      console.log("token", token);
      if(token) {
        this.tokenService.saveToken(token);
        return this.router.navigate([ '/' ]);
      }
      return this.router.navigate([ '/login' ]);
    })
  }
}