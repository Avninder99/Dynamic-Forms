import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/notification';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // NOTE -> this socket file belongs to my other branch code where continous connect/disconnect command is issued for socket based on component
  // so it containes some redundent code, will clean it soon

  tokenService = inject(TokenService);

  private socket: Socket;
  private connected: Promise<boolean>;
  private isConnected: boolean = false;
  private isPending: boolean = false;
  private userToken: string = '';

  private messages$: Subject<Message>;
  private notification$: Subject<Notification>;

  constructor() { 

    this.messages$ = new Subject<Message>();
    this.notification$ = new Subject<Notification>();

    this.userToken = this.tokenService.getToken();
    console.log("Socket checking user token - ", this.userToken);
    // tells socket the URI of backend server and set auto connect to false
    this.socket = io(`${environment.backend_url}`, {
      autoConnect: false,
      auth: (cb) => cb({ token: this.userToken }),
      query: {
        userToken: this.userToken
      }
    });

    if(this.userToken) {
      this.connect();
    }

    // disconnect event listener for socket -> logs it and set the class variable
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.isPending = false;
      this.isConnected = false;
    });

    this.socket.on('message_STC', (messageObject) => {
      console.log(messageObject);
      this.messages$.next(messageObject);
    })

    this.socket.on('notify_STC', (newNotification: Notification) => {
      this.notification$.next(newNotification);
    })
  }

  newMessagePresenter() {
    return this.messages$.asObservable();
  }

  newNotificationPresenter() {
    return this.notification$.asObservable();
  }

  async refreshConnection() {

    if(this.isConnected) {
      await this.disconnect();
    }
    this.userToken = this.tokenService.getToken();
    console.log("Socket checking user token - ", this.userToken);
    if(this.userToken) {
      this.connect();
    }

  }

  // this is a promise based handler which is made keeping in mind the delay it can take for socket to establish the connection
  // connected class variable takes it's promise, it also manages an isConnected class variable
  private socketConnectionHandler(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log('Socket connected');
        this.isPending = false;
        this.isConnected = true;
        resolve(true);
      });
      
      // Event handler for a failed connection
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isPending = false;
        this.isConnected = false;
        reject(false);
      });
    })
  }
  
  // initiate the connection
  // if connected already don't do anything
  // else if connecting then don't do anything either
  // else not connected initiate connection and reset the connected varaible to pending state 
  connect() {
    if(this.isConnected || this.isPending) {
      return;
    }
    else {
      this.isPending = true;
      this.connected = this.socketConnectionHandler();
      this.socket.connect();
    }
  }

  // disconnect socket
  // resolve connected to false, call socket.disconnect
  async disconnect() {
    if(this.isPending) {
      await this.connected;
    }
    this.socket.removeListener('connect');
    this.socket.removeListener('connect_error');
    this.connected = new Promise((resolve, reject) => {
      this.socket.disconnect();
      resolve(false);
    });
    console.log('socket disconnected');
  }

  getSocket() {
    return this.socket;
  }

  connectionStatus() {
    return this.isConnected;
  }

  async emitEvent(event: string, data: any, cb?: Function) {
    try {
      if (!this.isConnected) {
        this.connect();
        await this.connected;
      }
      if(cb) {
        this.socket.emit(event, data, cb);
      }else {
        this.socket.emit(event, data);
      }
    } catch (error) {
      console.error('Failed to establish socket connection:', error);
    }
  }
}