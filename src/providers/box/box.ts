import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import { SocketService } from '../socket/socket';

@Injectable()
export class BoxProvider {

    switches: Map<string, boolean>;
    leds: Map<string, boolean>;

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

        this.leds = new Map();
        this.leds.set('LED_OK', false);
        this.leds.set('LED_1', false);
        this.leds.set('LED_2', false);
        this.leds.set('LED_3', false);

        this.socketService.initialize();

        this.socketService.onSwitchChanged().subscribe((switchObj) => {
            this.switches.set(switchObj.id, switchObj.val);
            //console.log('onSwitchChanged', switchObj);

            if (switchObj.id === "switch_activate" && switchObj.val == 1) {
                this.onBoxActivated();
            }
            else if (switchObj.id === "switch_activate" && switchObj.val == 0) {
                this.onBoxDeactivated();
            }
        });

        this.socketService.onLEDChanged().subscribe((LEDObj) => {
            //console.log("onLEDChanged", LEDObj);
            this.leds.set(LEDObj.id, LEDObj.val);
        });

        this.socketService.onSwitchesVals().subscribe((switchObjs) => {
            console.log("onSwitchesVals", switchObjs);
            for (const switchId in switchObjs) {
                this.switches.set(switchId, switchObjs[switchId]);
            }
        });

        this.socketService.onLEDsVals().subscribe((LEDObjs) => {
            console.log("onLEDsVals", LEDObjs);
            for (const LEDId in LEDObjs) {
                this.leds.set(LEDId, LEDObjs[LEDId]);
            }
        });

        //this.socketService.getSwitchesVals();

    }

    onBoxActivated() {
        console.log("onBoxActivated()");
    }

    onBoxDeactivated() {
        console.log("onBoxDeactivated()");
    }

    getSwitchesVals() {
        this.socketService.getSwitchesVals();
    }

    initialize() {

    }

}
