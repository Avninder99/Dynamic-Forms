import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() chat: { message: string, createdAt: string, sender: { _id: string, fullname: string } };
  @Input() currentUserId: string = '';
}
