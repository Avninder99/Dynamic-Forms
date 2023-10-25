import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  tokenService = inject(TokenService);

  private socket: Socket;
  private connected: Promise<Boolean>;
  private isConnected: Boolean = false;
  private isPending: Boolean = false;
  // private status: number = -1;

  constructor() { 

    const userToken = this.tokenService.getToken();

    // tells socket the URI of backend server and set auto connect to true
    this.socket = io(`${environment.backend_url}`, {
      autoConnect: false,
      query: {
        userToken
      }
    });

    // disconnect event listener for socket -> logs it and set the class variable
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.isPending = false;
      this.isConnected = false;
      // this.status = -1;
    });
  }

  // this is a promise based handler which is made keeping in mind the delay it can take for socket to establish the connection
  // connected class variable takes it's promise, it also manages an isConnected class variable
  private socketConnectionHandler(): Promise<Boolean> {
    // console.log('checker')
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log('Socket connected');
        // console.log(Date())
        this.isPending = false;
        this.isConnected = true;
        // this.status = 1;
        resolve(true);
      });
      
      // Event handler for a failed connection
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isPending = false;
        this.isConnected = false;
        // this.status = -1;
        reject(false);
      });
    })
  }
  
  // initiate the connection
  // if connected already don't do anything
  // else if connecting then don't do anything either
  // else not connected initiate connection and reset the connected varaible to pending state 
  connect() {
    // if(this.status !== -1) { do something } else { don't }
    if(this.isConnected || this.isPending) {
      return;
    }
    else {
      // console.log('here11')
      this.isPending = true;
      this.connected = this.socketConnectionHandler();
      this.socket.connect();
    }
    // console.log(this.connected)
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
