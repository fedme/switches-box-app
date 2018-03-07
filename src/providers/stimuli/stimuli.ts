import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { CONDITIONS, SWITCHES_IDS } from './constants';

@Injectable()
export class Stimuli {

  condition: string;
  conditionSwitchId: string;
  conditionIndex: number;

  initialTimestamp: number;
  participant: Participant;
  conditionCounterOverride: number = null;
  runInBrowser: boolean = false;

  trials: any[] = [];
  guesses: any[] = [];

  constructor(private utils: Utils, private platform: Platform) {
    console.log('Hello Stimuli Provider');
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.runInBrowser = this.platform.is('core') || this.platform.is('mobileweb');
  }

  onBeforeRegistration() {
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
  }

  onAfterRegistration() {
    this.initialTimestamp = Date.now();
    this.trials = [];
    this.guesses = [];
    this.pickCondition();
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
    this.condition = CONDITIONS[counter % CONDITIONS.length];
    this.conditionIndex = counter % CONDITIONS.length;
    this.conditionSwitchId = this.utils.pickRandomFromArray(SWITCHES_IDS);

    console.log("condition", this.condition);
    console.log("condition switch id", this.conditionSwitchId);
  }

  saveTrial(switches: Map<string, boolean>) {
    this.trials.push({
      "timestamp": Date.now(),
      "switches": {
        "switch_1": switches.get("switch_1"),
        "switch_2": switches.get("switch_2"),
        "switch_3": switches.get("switch_3"),
        "switch_4": switches.get("switch_4"),
        "switch_5": switches.get("switch_5"),
        "switch_6": switches.get("switch_6"),
      }
    });
    console.log("RecordedTrials", this.trials);
  }

  logGuess(guess: string) {
    this.guesses.push({
      "timestamp": Date.now(),
      "guess": guess,
      "correct": guess == this.conditionSwitchId
    });
    console.log("RecordedGuesses", this.guesses);
  }



  getParticipantAgeGroup() {
    if (this.participant.age >= 18) return 18;
    return this.participant.age;
  }

}
