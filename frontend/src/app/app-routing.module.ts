import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHolderComponent } from './form-holder/form-holder.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { userLoggedInCanActivateFn } from './guards/userLoggedIn';
import { EditFormHolderComponent } from './edit-form/edit-form-holder.component';
import { ShowFormComponent } from './show-form/show-form.component';
import { userLoggedOutCanActivateFn } from './guards/userLoggedOut';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreatedFormsComponent } from './dashboard/created-forms/created-forms.component';
import { ResponsesComponent } from './dashboard/responses/responses.component';
import { OauthHandlerComponent } from './auth/oauth-handler/oauth-handler.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { SharedFormsComponent } from './dashboard/shared-forms/shared-forms.component';
import { ChatsComponent } from './dashboard/chats/chats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', 
    component: AuthComponent,
    canActivate: [ userLoggedOutCanActivateFn ],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'forms',
    canActivateChild: [ userLoggedInCanActivateFn ],
    children: [
      { path: 'create', component: FormHolderComponent },
      { path: ':id', 
        children: [
          { path: '', component: ShowFormComponent }, // home component used as placeholder
          { path: 'edit', component: EditFormHolderComponent }
        ]
      }
    ]  
  },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ userLoggedInCanActivateFn ],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'myForms', component: CreatedFormsComponent },
      { path: 'myResponses', component: ResponsesComponent },
      { path: 'sharedWithMe', component: SharedFormsComponent },
      { path: 'chats', component: ChatsComponent }
    ]
  },
  { path: 'authHandler/google/oauth20', component: OauthHandlerComponent },
  { path: 'account-activation/:slug', component: AccountActivationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
