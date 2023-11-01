import { Component, OnInit, inject } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: Boolean = false;
  tokenService = inject(TokenService);

  ngOnInit() {
    this.isLoggedIn = this.tokenService.getToken() !== '';
  }
  
}
