import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { FormHolderComponent } from './form-holder/form-holder.component';
import { FormElementComponent } from './form-element/form-element.component';
import { FormTextFieldComponent } from './form-fields/form-text-field/form-text-field.component';
import { FormNumberFieldComponent } from './form-fields/form-number-field/form-number-field.component';
import { FormDropdownFieldComponent } from './form-fields/form-dropdown-field/form-dropdown-field.component';
import { FormRadioButtonsFieldComponent } from './form-fields/form-radio-buttons-field/form-radio-buttons-field.component';
import { FormCheckboxesFieldComponent } from './form-fields/form-checkboxes-field/form-checkboxes-field.component';
import { FormMultipleOptionsFieldComponent } from './form-fields/form-multiple-options-field/form-multiple-options-field.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EditFormHolderComponent } from './edit-form/edit-form-holder.component';
import { ShowTextFieldComponent } from './show-form/show-fields/show-text-field/show-text-field.component';
import { ShowRadioFieldComponent } from './show-form/show-fields/show-radio-field/show-radio-field.component';
import { ShowDropdownFieldComponent } from './show-form/show-fields/show-dropdown-field/show-dropdown-field.component';
import { ShowNumberFieldComponent } from './show-form/show-fields/show-number-field/show-number-field.component';
import { ShowCheckboxFieldComponent } from './show-form/show-fields/show-checkbox-field/show-checkbox-field.component';
import { ShowFormComponent } from './show-form/show-form.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreatedFormsComponent } from './dashboard/created-forms/created-forms.component';
import { ResponsesComponent } from './dashboard/responses/responses.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { OauthHandlerComponent } from './auth/oauth-handler/oauth-handler.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { ManageEditorsComponent } from './manage-editors/manage-editors.component';
import { SharedFormsComponent } from './dashboard/shared-forms/shared-forms.component';


@NgModule({
  declarations: [
    AppComponent,
    FormHolderComponent,
    FormElementComponent,
    FormTextFieldComponent,
    FormNumberFieldComponent,
    FormDropdownFieldComponent,
    FormRadioButtonsFieldComponent,
    FormCheckboxesFieldComponent,
    FormMultipleOptionsFieldComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    HomeComponent,
    EditFormHolderComponent,
    ShowTextFieldComponent,
    ShowRadioFieldComponent,
    ShowDropdownFieldComponent,
    ShowNumberFieldComponent,
    ShowCheckboxFieldComponent,
    ShowFormComponent,
    NavComponent,
    DashboardComponent,
    ProfileComponent,
    CreatedFormsComponent,
    ResponsesComponent,
    SidebarComponent,
    OauthHandlerComponent,
    AccountActivationComponent,
    ManageEditorsComponent,
    SharedFormsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
