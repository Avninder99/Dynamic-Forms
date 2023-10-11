import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { TokenService } from 'src/app/services/token.service';

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

  showError: Boolean = false;
  errorMessage: String = '';
  isDisabled: Boolean = false;

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
        (res: { message: String, token: string }) => {
          console.log(res.token);
          if(res.token) {
            this.tokenService.saveToken(res.token);
            this.route.navigate([ this.routeService.getPrevURL() ]);
          }
        },
        (error: { message: String }) => {
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
}
