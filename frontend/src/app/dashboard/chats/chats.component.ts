import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {

  tokenService = inject(TokenService);
  socketService = inject(SocketService);
  chatService = inject(ChatService);
  conversations: { _id: string, formAuthor: string, formResponder: string, isActive: boolean, conversationId: string, createdAt: Date, relatedForm: string }[] = [];
  currentUserId: string;
  selectedConversationChats: { sender: string, reciever: string, message: string }[] = [];

  constructor() {
    this.socketService.connect();
    const payload = this.tokenService.getParsedTokenData();
    this.currentUserId = payload.id;
    console.log("-----", this.currentUserId);
  }
  
  ngOnInit() {
    this.chatService.fetchAllMyConversations().subscribe(
      (res: { message: string, chats: { _id: string, formAuthor: string, formResponder: string, isActive: boolean, conversationId: string, createdAt: Date, relatedForm: string }[]}) => {
        console.log(res);
        this.conversations = res.chats;
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )
  }

  fetchChats(conversationId: string) {
    console.log(conversationId);
    this.chatService.fetchAllChatsForSingleConversation(conversationId).subscribe(
      (res: { message: string, chats: { sender: string, reciever: string, message: string }[] }) => {
        console.log(res);
        this.selectedConversationChats = res.chats
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(message);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
