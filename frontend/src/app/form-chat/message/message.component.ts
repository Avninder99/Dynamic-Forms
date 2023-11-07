import { Component, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() chat: Message;
  @Input() currentUserId: string = '';
}
