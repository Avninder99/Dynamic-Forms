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

  saveForm(formName: String, formFields, newEditors: string[]) {

    const userToken = this.tokenService.getToken();
    this.tokenService.tokenChecker();

    const formData = {
      token: userToken,
      formName,
      formFields,
      newEditors
    }

    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }
    return this.http.post(`${environment.backend_url}/api/form/generate`, formData, header);
  }

  // for show page
  fetchFormBasic(id: String) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.get(`${environment.backend_url}/api/form/${id}`, header);
  }

  // for edit page
  fetchFormComplete(id: String) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }
    return this.http.get(`${environment.backend_url}/api/form/${id}/complete`, header);
  }

  updateForm(formName: String, formFields, formId: String) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    const body = {
      formName,
      formFields,
      formId
    }
    return this.http.post(`${environment.backend_url}/api/form/${formId}/update`, body, header);
  }

  fetchMyForms() {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.get(`${environment.backend_url}/api/form/fetchAll`, header);
  }

  fetchSharedWithMeForms() {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.get(`${environment.backend_url}/api/form/fetchSharedForms`, header);
  }

  switchMode(id: string, mode: string) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.post(`${environment.backend_url}/api/form/${id}/mode/${mode}`, {
      formId: id
    }, header);
  }

  patchFormEditors(newEditors: string[], formId: string) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.post(`${environment.backend_url}/api/form/${formId}/patchEditors`, { newEditors }, header);
  }

  unloadTransmitter(id: string) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.post(`${environment.backend_url}/api/form/${id}/unlock`, {}, header);
  }
}
