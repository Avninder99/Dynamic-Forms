import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHolderComponent } from './form-holder/form-holder.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: FormHolderComponent },
  { path: '', 
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
