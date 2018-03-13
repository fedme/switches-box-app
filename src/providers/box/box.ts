import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Api } from '../api/api';
import { Stimuli } from '../stimuli/stimuli';
import { SWITCHES_IDS } from '../stimuli/constants';
import { SocketService } from '../socket/socket';

@Injectable()
export class BoxProvider {

    switches: Map<string, boolean>;
    leds: Map<string, boolean>;
    connected: boolean;

    constructor(private api: Api, private socketService: SocketService, private stimuli: Stimuli) {
        console.log('Hello Box Provider');

        this.initializeIO();
        this.socketService.initialize();
        this.connected = false;

        this.socketService.onConnect().subscribe(() => {
            this.connected = true;
            this.stopFlowingLeds();
            console.log("[Socket] Connected");
        });

        this.socketService.onDisconnect().subscribe((reason: string) => {
            this.connected = false;
            console.log("[Socket] Disconnected", reason);
        });

        this.socketService.onReconnect().subscribe((attemptNumber: number) => {
            this.connected = true;
            console.log("[Socket] Reconnected", attemptNumber);
        });

        this.socketService.onSwitchChanged().subscribe((switchObj) => {
            this.onSwitchChanged(switchObj);
        });

        this.socketService.onLEDChanged().subscribe((LEDObj) => {
            this.leds.set(LEDObj.id, LEDObj.val);
        });

        this.socketService.onSwitchesVals().subscribe((switchObjs) => {
            //console.log("onSwitchesVals", switchObjs);
            for (const switchId in switchObjs) {
                this.switches.set(switchId, switchObjs[switchId]);
            }
        });

        this.socketService.onLEDsVals().subscribe((LEDObjs) => {
            //console.log("onLEDsVals", LEDObjs);
            for (const LEDId in LEDObjs) {
                this.leds.set(LEDId, LEDObjs[LEDId]);
            }
        });

    }

    private initializeIO() {
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
    }

    onBoxActivated(): void {

        console.log("onBoxActivated()");
        console.log("box.switches", this.switches)
        console.log("stimuli.conditionSwitchId", this.stimuli.conditionSwitchId);

        if (this.stimuli.condition == "one_working") {
            if (this.switches.get(this.stimuli.conditionSwitchId)) {
                this.setAllLedsOn();
            }
        }
        else if (this.stimuli.condition == "one_not_working") {

            // get a list of all switches ids except the condition switch
            let switches_ids = SWITCHES_IDS.slice();
            console.log("switches_ids pre slice", switches_ids)
            const idx = switches_ids.indexOf(this.stimuli.conditionSwitchId);
            if (idx > -1) {
                switches_ids.splice(idx, 1);
            }
            console.log("switches_ids post slice", switches_ids)

            // Loop over those switches values
            let switchesCondition: boolean = false;
            for (let switch_id of switches_ids) {
                console.log("Loop: " + switch_id + " has value", this.switches.get(switch_id));
                switchesCondition = switchesCondition || this.switches.get(switch_id);
                console.log("--> switchesCondition updated to:", switchesCondition);
            }

            console.log("switchesCondition after loop", switchesCondition);

            if (switchesCondition) {
                this.setAllLedsOn();
            }
            
        }
        this.stimuli.saveTrial(new Map(this.switches));
    }

    onBoxDeactivated(): void {
        this.setAllLedsOff();
    }

    private onSwitchChanged(switchObj: any): void {

        const allowed = ["switch_1", "switch_2", "switch_3", "switch_4", "switch_5", "switch_6", "switch_activate"];
        if (allowed.indexOf(switchObj.id) < 0) return;

        this.switches.set(switchObj.id, switchObj.val);
        //console.log('onSwitchChanged', switchObj);

        if (switchObj.id === "switch_activate" && switchObj.val == 1) {
            this.onBoxActivated();
        }
        else if (switchObj.id === "switch_activate" && switchObj.val == 0) {
            this.onBoxDeactivated();
        }
    }

    setAllLedsOn(): void {
        this.socketService.emitEvent("setAllLEDs", 1);
    }

    setAllLedsOff(): void {
        this.socketService.emitEvent("setAllLEDs", 0);
    }

    startFlowingLeds(): void {
        this.socketService.emitEvent("startFlowingLEDs", true);
    }

    stopFlowingLeds(): void {
        this.socketService.emitEvent("stopFlowingLEDs", true);
    }

    blinkAllLeds(): void {
        this.socketService.emitEvent("blinkAllLEDs", 2);
    }

}
