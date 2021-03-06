import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Stimuli, Data, BoxProvider } from '../../providers/providers';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli, private data: Data, private toastCtrl: ToastController, private box: BoxProvider) {
      
      // Initialize providers
      this.stimuli.onBeforeRegistration();
      this.data.initialize();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');

    if (this.parseUrlParams()) {
      console.log("participant:", this.stimuli.participant);
      this.stimuli.onAfterRegistration();
      this.navCtrl.setRoot('ConsentFormPage'); // always use setRoot instead of push
    }
  }

  handleRegistration() {
    if (this.validateRegistration()) {
      this.stimuli.onAfterRegistration();
      this.navCtrl.setRoot('TestPage'); // always use setRoot instead of push
    }
  }

  validateRegistration() {
    const ageNull = this.stimuli.participant.age == null;
    const genderNull = this.stimuli.participant.gender == null;
    if (ageNull || genderNull) {
      let toast = this.toastCtrl.create({
        message: 'Please fill all the required fields',
        duration: 3000
      });
      toast.present();
      return false;
    }
    return true;
  }

  parseUrlParams() {
    let codeProvided = false;
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let i: any;
      for (i in splitParams){
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "participant_code"){
          this.stimuli.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "workerId"){
          this.stimuli.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "participant_age"){
          this.stimuli.participant.age = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "participant_grade"){
          this.stimuli.participant.grade = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "condition"){
          this.stimuli.conditionCounterOverride = parseInt(singleURLParam[1]);
          this.stimuli.pickCondition();
          console.log("[param][conditionCounterOverride]", parseInt(singleURLParam[1]));
          console.log( this.stimuli.conditionCounterOverride);
        }
      }
    }
    return codeProvided;
  }
 

}
