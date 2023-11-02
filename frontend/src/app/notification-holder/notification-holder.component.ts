import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-holder',
  templateUrl: './notification-holder.component.html',
  styleUrls: ['./notification-holder.component.css']
})
export class NotificationHolderComponent implements OnInit {

  tokenService = inject(TokenService);
  socketService = inject(SocketService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  loading: boolean = true;

  notifications: { form: { title: string, _id: string }, _id: string, message: string }[] = [];
  @Output() navigateEvent: EventEmitter<void>;

  constructor() {
    this.navigateEvent = new EventEmitter<void>();
  }

  ngOnInit() {
    this.loading = true;
    this.notificationService.fetchNotifications().subscribe(
      (res: { 
        message: string, 
        notifications: { 
          form: { 
            _id: string, 
            title: string 
          }, 
          message: string, 
          _id: string
        }[]
      }) => {
        this.notifications = [];
        res.notifications.forEach((notification) => {
          this.notifications.unshift(notification);
        })
        this.loading = false;
      },
      (errorRes) => {
        console.log(errorRes);
        this.loading = false;
      }
    )

    this.socketService.newNotificationPresenter().subscribe(
      (newNotification: { form: { title: string, _id: string }, _id: string, message: string }) => {
        this.notifications.unshift(newNotification);
      }
    )
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id).subscribe(
      (res) => {
        console.log(res);
        const index = this.notifications.findIndex((element) => {
          return element._id === id;
        })
        this.notifications.splice(index, 1);
      },
      (errorRes) => {
        console.log(errorRes);
        alert('Error on deleting notification');
      }
    )
  }
  
  navigateToForm() {
    this.navigateEvent.emit();
  }
}
