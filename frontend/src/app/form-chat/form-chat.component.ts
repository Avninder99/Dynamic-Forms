import { Component, Input, inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { TokenService } from '../services/token.service';
import { SocketService } from '../services/socket.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-form-chat',
  templateUrl: './form-chat.component.html',
  styleUrls: ['./form-chat.component.css']
})
export class FormChatComponent {

  chatService = inject(ChatService);
  notificationService = inject(NotificationService);
  tokenService = inject(TokenService);
  socketService = inject(SocketService);


  chats: { message: string, createdAt: string, sender: { _id: string, fullname: string } }[] = [];
  currentUserId: string;
  payload: any;
  message: string = '';
  chatJoined: boolean = false;
  canSend: boolean = true;
  isSubscribed: boolean = false;
  // newMessageListener
  @Input() formId: String = '';
  @Input() formTitle: string = '';
  
  ngOnInit() {
    this.payload = this.tokenService.getParsedTokenData();
    console.log(this.payload);
    if(this.payload) {
      this.currentUserId = this.payload.id;

    }

    this.socketService.emitEvent('join_chat_CTS', { userId: this.currentUserId, formId: this.formId }, (success: boolean) => {
      // success -> do nothing
      // failure -> alert
      console.log(success);
      if(success) {
        this.chatJoined = true;
      }else {
        alert('Error: Unable to join chat');
        this.chatJoined = false;
      }
    })

    this.chatService.fetchChats(this.formId).subscribe(
      (res: { message: string, chats: { message: string, createdAt: string, sender: { _id: string, fullname: string } }[], subscribed: boolean }) => {
        console.log(res);
        this.chats = res.chats;
        this.isSubscribed = res.subscribed;
      },
      (errorRes) => {
        console.log(errorRes);
        alert('An error occured will retriving the chats');
      }
    )
    this.chatService.joinChat(this.formId);

    this.socketService.newMessagePresenter().subscribe(
      (newMessageObject: { message: string, createdAt: string, sender: { _id: string, fullname: string } }) => {
        this.chats.push(newMessageObject);
      }
    )
  }

  sendMessage() {
    if(this.message.trim() && this.chatJoined) {
      this.canSend = false;
      console.log(this.payload)
      this.chatService.sendMessage(this.message, this.currentUserId, this.payload.fullname, this.formId, this.formTitle ,(success: boolean) => {
        console.log("message sent - ", success);
        if(!success) {
          alert('message not sent');
        }
      })
      this.chats.push({ message: this.message, createdAt: '', sender: { _id: this.currentUserId, fullname: this.payload.fullname } });
      this.canSend = true;
    }else {
      alert('message not sent');  // to be removed
    }
    this.message = '';
  }

  subscribe() {
    this.notificationService.notifySubscribeToggler(!this.isSubscribed, this.currentUserId, this.formId, (newState) => {
      this.isSubscribed = newState;
    })
  }

  ngOnDestroy() {
    if(this.chatJoined) {
      this.chatService.leaveChat(this.currentUserId, this.formId, (success) => {
        // success -> do nothing
        // failure -> alert
        console.log(success);
        if(success) {
          this.chatJoined = true;
        }else {
          alert('Error: Unable to join chat');
          this.chatJoined = false;
        }
      })
    }
  }

}
