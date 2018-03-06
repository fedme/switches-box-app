import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.0.10:3000';

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

    public setLED(LED: any): void {
        this.socket.emit('setLED', LED);
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

}
