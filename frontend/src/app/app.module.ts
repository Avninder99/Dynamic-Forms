import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
import { PresentFormComponent } from './present-form/present-form.component';
import { ShowTextFieldComponent } from './show-fields/show-text-field/show-text-field.component';
import { ShowRadioFieldComponent } from './show-fields/show-radio-field/show-radio-field.component';
import { ShowDropdownFieldComponent } from './show-fields/show-dropdown-field/show-dropdown-field.component';
import { ShowNumberFieldComponent } from './show-fields/show-number-field/show-number-field.component';
import { ShowCheckboxFieldComponent } from './show-fields/show-checkbox-field/show-checkbox-field.component';


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
    PresentFormComponent,
    ShowTextFieldComponent,
    ShowRadioFieldComponent,
    ShowDropdownFieldComponent,
    ShowNumberFieldComponent,
    ShowCheckboxFieldComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
