import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {

  message: string = '';
  @Input() chats: { sender: string, reciever: string, message: string }[] = [];
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>();

  sendChat() {
    if(this.message.trim()) {
      this.messageEmitter.emit(this.message);
      this.message = '';
    }
  }

}
