import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.50.10:3000';

@Injectable()
export class SocketService {


    data: Map<string, any>;
    private socket: any;

    constructor(private api: Api) {
        console.log('Hello SocketService');
    }

    initialize() {
        this.initSocket();
    }

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public emitEvent(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }

    public getSwitchesVals(): void {
        this.socket.emit('getSwitchesVals', true);
    }

    public onSwitchChanged(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('switchChanged', (data: any) => observer.next(data));
        });
    }

    public onLEDChanged(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('LEDChanged', (data: any) => observer.next(data));
        });
    }

    public onSwitchesVals(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('onSwitchesVals', (data: any) => observer.next(data));
        });
    }

    public onLEDsVals(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('onLEDsVals', (data: any) => observer.next(data));
        });
    }

    public onConnect(): Observable<any> {
        this.socket.sendBuffer = []; // clean buffer on reconnection
        return new Observable<any>(observer => {
            this.socket.on('connect', () => observer.next());
        });
    }

    public onDisconnect(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('disconnect', (reason: string) => observer.next(reason));
        });
    }

    public onReconnect(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('reconnect', (attempNumber: number) => observer.next(attempNumber));
        });
    }

    public onReconnecting(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('reconnecting', (attempNumber: number) => observer.next(attempNumber));
        });
    }

}
