import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { CONDITIONS } from './constants';

@Injectable()
export class Stimuli {

  conditionIndex: number;
  initialTimestamp: number;
  participant: Participant;
  conditionCounterOverride: number = null;
  currentTestIndex: number = -1;
  runInBrowser: boolean = false;
  

  constructor(private utils: Utils, private platform: Platform) {
    console.log('Hello Stimuli Provider');
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.runInBrowser = this.platform.is('core') || this.platform.is('mobileweb');
  }

  initialize() {
    this.initialTimestamp = Date.now();
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.pickCondition();
    
    this.currentTestIndex = -1;
  }

  pickCondition() {
    let counter = 0;
    if (this.conditionCounterOverride != null) {
      console.log("conditionCounterOverride", this.conditionCounterOverride);
      counter = this.conditionCounterOverride;
    }
    else {
      counter = this.utils.getCounterValue();
      this.utils.incrementCounter(); // TODO: move to the data saving 
    }
    let condition = CONDITIONS[counter % CONDITIONS.length];
    this.conditionIndex = counter % CONDITIONS.length;
    

  }



  getParticipantAgeGroup() {
    if (this.participant.age >= 18) return 18;
    return this.participant.age;
  }

}
