import { Component, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  tokenService = inject(TokenService);
  socketService = inject(SocketService);
  router = inject(Router);

  showNotification: boolean = false;
  notifications: { form: { formTitle: string, formId: string } }[] = [];
  newNotificationCount: number = 0;

  ngOnInit() {
    this.socketService.newNotificationPresenter().subscribe(
      (newNotification: { form: { formTitle: string, formId: string } }) => {
        this.newNotificationCount++;
        // this.notifications.unshift(newNotification);
      }
    )
  }

  isLoggedIn() {
    return this.tokenService.getToken();
  }

  loginUser() {
    return this.router.navigate([ '/login' ]);
  }

  logoutUser() {
    this.socketService.disconnect();
    this.tokenService.clearToken();
    this.router.navigate([ '/login' ]);
  }

  toggleNotificationHolder(){
    console.log(this.notifications.length)
    this.showNotification = !this.showNotification;

    this.newNotificationCount = 0;
  }
}
