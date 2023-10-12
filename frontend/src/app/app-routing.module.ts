import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHolderComponent } from './form-holder/form-holder.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { userLoggedInCanActivateFn } from './guards/canActivate';
import { PresentFormComponent } from './present-form/present-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', 
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'forms',
    canActivateChild: [ userLoggedInCanActivateFn ],
    children: [
      { path: 'create', component: FormHolderComponent },
      { path: ':id', component: PresentFormComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }