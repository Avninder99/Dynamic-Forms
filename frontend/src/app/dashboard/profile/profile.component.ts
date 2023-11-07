import { Component, OnInit, inject } from '@angular/core';
import { UserData } from 'src/app/interfaces/user-data';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileInfo: UserData;
  showError: boolean = false;
  loading: boolean = true;
  tokenService = inject(TokenService);
  userService = inject(UserService);

  ngOnInit() {
    this.loading = true;
    this.showError = false;
    this.userService.fetchMe().subscribe(
      (res: { message: string, user: UserData }) => {
        this.profileInfo = res.user;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.showError = true;
      }
    )
  }
}
