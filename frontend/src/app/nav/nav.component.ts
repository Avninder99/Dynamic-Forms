import { Component, OnInit, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { Notification } from '../interfaces/notification';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  tokenService = inject(TokenService);
  socketService = inject(SocketService);
  router = inject(Router);

  showNotification: boolean = false;
  // notifications: { form: { formTitle: string, formId: string }, notificationId: string }[] = [];
  newNotificationCount: number = 0;

  isUserLoggedIn: boolean = false;

  ngOnInit() {

    this.tokenService.presentTokenSubject().subscribe(
      (token) => {
        if(token){
          this.isUserLoggedIn = true;
          console.log('ranI');
        } else {
          this.isUserLoggedIn = false;
          console.log('ranO')
        }
      }
    )

    this.tokenService.setSubjectInitially();

    this.socketService.newNotificationPresenter().subscribe(
      (newNotification: Notification) => {
        this.newNotificationCount++;
      }
    )
  }

  // isLoggedIn() {
  //   return this.tokenService.getToken();
  // }

  loginUser() {
    return this.router.navigate([ '/login' ]);
  }

  logoutUser() {
    this.socketService.disconnect();
    this.tokenService.clearToken();
    this.router.navigate([ '/login' ]);
  }

  toggleNotificationHolder(){
    // console.log(this.notifications.length)
    this.showNotification = !this.showNotification;
    this.newNotificationCount = 0;
  }
}
