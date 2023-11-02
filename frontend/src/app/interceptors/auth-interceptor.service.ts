import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // console.log(req.url);
    // Protected URLS via auth token
    const protectedUrls = [ '/api/user', '/api/response', '/api/notifications', '/api/form', '/api/chats' ];

    // Check if the request's URL matches any of the protected URLs
    const shouldAddHeader = protectedUrls.some(url => req.url.includes(url));
    
    // If the URL is not in the protected URL list, let the original request pass
    if(!shouldAddHeader) {
      return next.handle(req);
    }

    // URL is in the protected URLs list, add the headers to it

    const token = this.tokenService.getToken();

    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
