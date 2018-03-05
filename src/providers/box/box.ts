import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import { SocketService } from '../socket/socket';

@Injectable()
export class Box {

    switches: Map<string, boolean>;

    constructor(private api: Api, private socketService: SocketService) {
        console.log('Hello Box Provider');

        this.switches = new Map();
        this.switches.set('switch_1', false);
        this.switches.set('switch_2', false);
        this.switches.set('switch_3', false);
        this.switches.set('switch_4', false);
        this.switches.set('switch_5', false);
        this.switches.set('switch_6', false);
        this.switches.set('switch_activate', false);

        this.socketService.initialize();

        this.socketService.onSwitchChanged().subscribe((switchObj) => {

            this.switches.set(switchObj.id, switchObj.val);
            console.log('onSwitchChanged', switchObj);

            if (switchObj.id === "switch_activate" && switchObj.val == 1) {
                this.onBoxActivated();
            }
            else if (switchObj.id === "switch_activate" && switchObj.val == 0) {
                this.onBoxDeactivated();
            }

        });

    }

    onBoxActivated() {
        console.log("onBoxActivated()");
    }

    onBoxDeactivated() {
        console.log("onBoxDeactivated()");
    }

    initialize() {

    }

}
