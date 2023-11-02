import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  route = inject(Router);
  tokenService = inject(TokenService);

  constructor(private http: HttpClient) { }

  saveForm(formName: string, formFields, newEditors: string[]) {

    const userToken = this.tokenService.getToken();
    this.tokenService.tokenChecker();

    const formData = {
      token: userToken,
      formName,
      formFields,
      newEditors
    }

    return this.http.post(`${environment.backend_url}/api/form/generate`, formData);
  }

  // for show page
  fetchFormBasic(id: string) {
    return this.http.get(`${environment.backend_url}/api/form/${id}`);
  }

  // for edit page
  fetchFormComplete(id: string) {
    // const userToken = this.tokenService.getToken();
    // const header = {
    //   headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    // }
    // return this.http.get(`${environment.backend_url}/api/form/${id}/complete`, header);
    return this.http.get(`${environment.backend_url}/api/form/${id}/complete`);
  }

  updateForm(formName: string, formFields, formId: string) {
    const body = {
      formName,
      formFields,
      formId
    }
    return this.http.post(`${environment.backend_url}/api/form/${formId}/update`, body);
  }

  fetchMyForms() {
    return this.http.get(`${environment.backend_url}/api/form/fetchAll`);
  }

  fetchSharedWithMeForms() {
    return this.http.get(`${environment.backend_url}/api/form/fetchSharedForms`);
  }

  switchMode(id: string, mode: string) {
    return this.http.post(`${environment.backend_url}/api/form/${id}/mode/${mode}`, {
      formId: id
    });
  }

  patchFormEditors(newEditors: string[], formId: string) {
    return this.http.post(`${environment.backend_url}/api/form/${formId}/patchEditors`, { newEditors });
  }

  unloadTransmitter(id: string) {
    return this.http.post(`${environment.backend_url}/api/form/${id}/unlock`, {});
  }
}
