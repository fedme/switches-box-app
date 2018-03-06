import { Component } from '@angular/core';
import { BoxProvider } from '../../providers/providers';

@Component({
  selector: 'box',
  templateUrl: 'box.html'
})
export class BoxComponent {

  text: string;

  constructor(private box: BoxProvider) {
    console.log('Hello BoxComponent Component');
    //this.box.getSwitchesVals();
  }

  getSwitchOnOpacity(switchId: string) {
    if (this.box.switches.get(switchId) != null) {
      if (this.box.switches.get(switchId)) return 1;
      else return 0;
    }
    return 0;
  }

  getSwitchOffOpacity(switchId: string) {
    if (this.box.switches.get(switchId) != null) {
      if (this.box.switches.get(switchId)) return 0;
      else return 1;
    }
    return 1;
  }

  getLEDOnOpacity(LEDId: string) {
    if (this.box.leds.get(LEDId) != null) {
      if (this.box.leds.get(LEDId)) return 1;
      else return 0;
    }
    return 0;
  }

}
