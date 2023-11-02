import { Injectable, inject } from '@angular/core';
import { SocketService } from './socket.service';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  http = inject(HttpClient);
  socketService = inject(SocketService);
  tokenService = inject(TokenService);
  constructor() { }

  notifySubscribeToggler(newState: boolean, userId: string, formId: string, cb?: Function) {
    this.socketService.emitEvent('notify_toggle_CTS', { newState, userId, formId }, cb);
  }

  fetchNotifications() {
    return this.http.get(`${environment.backend_url}/api/notifications/`);
  }

}
