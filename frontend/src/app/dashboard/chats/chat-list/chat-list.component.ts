import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {

  @Input() conversations: { _id: string, formAuthor: string, formResponder: string, isActive: boolean, conversationId: string, createdAt: Date, relatedForm: string }[] = [];
  @Input() currentUserId: string;
  @Output() fetchChats: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    
  }

  ngOnInit() {
    
  }

  triggerFetchChats(conversationId: string) {
    console.log('clicked')
    this.fetchChats.emit(conversationId)
  }



}
