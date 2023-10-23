import { Component, inject } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileInfo: any;
  showError: Boolean = false;
  loading: Boolean = true;
  tokenService = inject(TokenService);
  userService = inject(UserService);

  ngOnInit() {
    this.loading = true;
    this.showError = false;
    // this.profileInfo = this.tokenService.getParsedTokenData();
    // console.log(this.profileInfo);
    this.userService.fetchMe().subscribe(
      (res: { message: string, user: Object }) => {
        console.log(res);
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
