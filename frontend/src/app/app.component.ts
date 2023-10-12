import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authService = inject(AuthService);
  tokenService = inject(TokenService);
  title = 'frontend';

  ngOnInit () {
    this.tokenService.fetchTokenFromCookie();
  }
}
