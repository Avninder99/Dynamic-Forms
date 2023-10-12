import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Simple form so template-driven form approach
  
  registerForm: FormGroup;
  showError: Boolean = false;
  errorMessage: String = '';
  isDisabled: Boolean = false;

  route = inject(Router);
  authService = inject(AuthService);
  tokenService = inject(TokenService);

  constructor() {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      gender: new FormControl(''),
      TAC: new FormControl(false, Validators.requiredTrue)
    })
  }

  submitForm(e: Event) {
    e.preventDefault();
    console.log(this.registerForm);

    this.isDisabled = true;
    this.showError = false;

    if(this.registerForm.valid && this.registerForm.get('password').value === this.registerForm.get('repeatPassword').value){
      this.authService.sendRegisterRequest(this.registerForm.value).subscribe(
        (res: { message: String, token: string }) => {
          console.log(res);
          this.tokenService.saveToken(res.token);
          this.route.navigate([ '/' ]);
        },
        (error) => {
          console.log(error);
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
