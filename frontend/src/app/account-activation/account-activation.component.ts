import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  socketService = inject(SocketService);

  slug: string = '';
  error: boolean = false;
  loading: boolean = true;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      
      this.authService.activateAccount(this.slug).subscribe(
        (res: { message: string, token: string }) => {
          this.loading = false;
          this.tokenService.saveToken(res.token);

          this.socketService.refreshConnection();
          
          setTimeout(() => {
            this.router.navigate([ '/' ]);
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.error = true;
          console.log(error);
        }
      )
    })
  }
}
