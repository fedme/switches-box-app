import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.0.10:3000';

@Injectable()
export class Box {


  data: Map<string, any>;
  private socket: any;

  constructor(private api: Api) {
      console.log('Hello Box Provider');
  }

  initialize() {
    this.initSocket();
  }

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public setLED(LED: any): void {
      this.socket.emit('setLED', LED);
  }

  public onSwitchChanged(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('switchChanged', (data: any) => observer.next(data));
      });
  }
  
}
