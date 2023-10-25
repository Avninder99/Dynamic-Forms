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

  initiateChat(message: string, formAuthor: string, formId: string , cb ?: Function) {
    this.socketService.connect();
    
    let sender_id = this.tokenService.getParsedTokenData().id , reciever_id = formAuthor, form_id = formId;
    this.socketService.emitEvent('initial_message_CTS', { message, sender_id, reciever_id, form_id }, cb);
  }

  fetchAllMyConversations() {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${userToken}`)
    }
    return this.http.get(`${environment.backend_url}/api/chats`, header);
  }

  fetchAllChatsForSingleConversation(conversationId: string) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${userToken}`)
    }

    return this.http.get(`${environment.backend_url}/api/chats/${conversationId}`, header);
  }

  sendMessage(message: string) {
    this.socketService.emitEvent('messsage_CTS', {})
  }

  
  closeSocket() {
    this.socketService.disconnect();
  }
}
