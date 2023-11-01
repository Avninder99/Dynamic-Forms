import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-oauth-handler',
  templateUrl: './oauth-handler.component.html',
  styleUrls: ['./oauth-handler.component.css']
})
export class OauthHandlerComponent implements OnInit {
  route = inject(ActivatedRoute);
  tokenService = inject(TokenService);
  socketService = inject(SocketService);
  router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      console.log("token", token);
      if(token) {
        this.tokenService.saveToken(token);
        this.socketService.refreshConnection();
        return this.router.navigate([ '/' ]);
      }
      return this.router.navigate([ '/login' ]);
    })
  }
}
