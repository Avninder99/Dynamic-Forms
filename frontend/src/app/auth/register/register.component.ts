import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Simple form so template-driven form approach
  
  registerForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  isDisabled: boolean = false;
  successMessage: string = '';
  showSuccess: boolean = false;

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
    this.showSuccess = false;

    if(this.registerForm.valid && this.registerForm.get('password').value === this.registerForm.get('repeatPassword').value){
      this.authService.sendRegisterRequest(this.registerForm.value).subscribe(
        (res: { message: string }) => {
          console.log(res);
          this.showSuccess = true;
          this.successMessage = res.message;
          // this.tokenService.saveToken(res.token);
          // this.route.navigate([ '/' ]);
        },
        (error: { message: string, error: { message: string } }) => {
          console.log("Error - ", error);
          this.errorMessage = error.error.message;
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
