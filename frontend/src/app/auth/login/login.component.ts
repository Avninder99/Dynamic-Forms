import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { SocketService } from 'src/app/services/socket.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Simple form so template-driven form approach
  
  loginForm: FormGroup;
  route = inject(Router);
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  routeService = inject(RouteService);
  socketService = inject(SocketService);

  showError: boolean = false;
  errorMessage: string = '';
  isDisabled: boolean = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', Validators.required)
    })
  }

  submitLogin (e: Event) {
    e.preventDefault()
    console.log(this.loginForm);
    this.showError = false;
    this.isDisabled = true;

    if(this.loginForm.valid) {
      this.authService.sendLoginRequest(this.loginForm.value).subscribe(
        (res: { message: string, token: string }) => {
          console.log(res.token);
          if(res.token) {
            this.tokenService.saveToken(res.token);
            this.socketService.refreshConnection();
            this.route.navigate([ this.routeService.getPrevURL() ]);
          }
        },
        (error: { message: string }) => {
          console.error(error.message);
          this.errorMessage = error.message;
          this.showError = true;
          this.isDisabled = false;
        },
        () => {
          console.log('completed');
        }
      )
    }else{
      this.errorMessage = 'Please fill the form correctly';
      this.showError = true;
      this.isDisabled = false;
    }
  }

  googleLogin() {
    window.location.href = `${environment.backend_url}/api/auth/google`
  }
}
