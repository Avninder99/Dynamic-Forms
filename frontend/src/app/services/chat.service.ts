import { Injectable, inject } from '@angular/core';
import { SocketService } from './socket.service';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  http = inject(HttpClient);
  socketService = inject(SocketService);
  tokenService = inject(TokenService);

  constructor() { }

  fetchChats(formId: String) {
    return this.http.get(`${environment.backend_url}/api/chats/${formId}`);
  }

  joinChat(formId: String) {

  }

  leaveChat(userId: string, formId: String, cb: Function) {
    this.socketService.emitEvent('leave_chat_CTS', { userId, formId }, cb);
  }

  sendMessage(message: string, userId: string, name: string, formId: String, formTitle: string, cb: Function) {
    this.socketService.emitEvent('message_CTS', { message, sender: { userId, name }, form: { formId, formTitle } }, cb);
  }
}
