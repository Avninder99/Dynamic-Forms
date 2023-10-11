import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  router = inject(Router)

  private prevURL = '/';
  private currentURL = '';
  constructor() { 
    this.currentURL = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.prevURL = this.currentURL;
        this.currentURL = event.url;
      };
    })
  }

  getPrevURL = () => {
    return this.prevURL;
  }

  getCurrentURL = () => {
    return this.currentURL;
  }
}
