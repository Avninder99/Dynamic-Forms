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

  notifications: { form: { formTitle: string, formId: string } }[] = [];
  @Output() navigateEvent: EventEmitter<void>;
  // fetchedNotification: { form: { formTitle: string, formId: string } }[] = []

  constructor() {
    this.navigateEvent = new EventEmitter<void>();
  }

  ngOnInit() {
    // alert('calling')
    this.notificationService.fetchNotifications().subscribe(
      (res: { 
        message: string, 
        notifications: { 
          formId: { 
            _id: string, 
            title: string 
          }, 
          message: string, 
          reciever: string,
        }[]
      }) => {
        this.notifications = [];
        res.notifications.forEach((notification) => {
          const notificationObject = {
            form: {
              formTitle: notification.formId.title,
              formId: notification.formId._id
            },
          }
          this.notifications.unshift(notificationObject);
        })

        // this.notifications.forEach((newNotification) => {
        //   this.fetchedNotification.unshift(newNotification);
        // })
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )

    this.socketService.newNotificationPresenter().subscribe(
      (newNotification: { form: { formTitle: string, formId: string } }) => {
        // this.newNotificationCount++;
        this.notifications.unshift(newNotification);
      }
    )
  }

  deleteNotification(index) {
    this.notifications.splice(index, 1);
  }
  
  navigateToForm() {
    this.navigateEvent.emit();
    // this.showNotification = false;
  }
  
  
}
