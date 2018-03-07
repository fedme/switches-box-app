import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Stimuli, BoxProvider, Data } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  guessedSwitchId: string;
  need2ConfirmGuess: boolean = false;
  outOfGuesses: boolean = false;
  need2ConfirmEnd: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: Data,
    private stimuli: Stimuli, private box: BoxProvider, private toastCtrl: ToastController) {


  }

  ionViewDidLoad() {
    this.box.stopFlowingLeds();
  }

  wantToLogGuess() {
    this.need2ConfirmGuess = true;
  }

  logGuess() {

    let msg: string = "The guessed switch is WRONG";
    let valid: boolean = true;
    let correct: boolean = false;

    if (this.guessedSwitchId == this.stimuli.conditionSwitchId) {
      correct = true;
      msg = "YOU GUESSED THE CORRECT SWITCH! END THE GAME NOW!";
    }

    if (this.guessedSwitchId == null || this.guessedSwitchId == "") {
      msg = "You have to select a switch from the dropdown menu";
      valid = false;
      correct = false;
    }

    if (valid && correct) {
      this.outOfGuesses = true;
    }

    if (valid) {
      this.stimuli.logGuess(this.guessedSwitchId);
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top',
      cssClass: (correct && valid) ? "toast-correct" : "toast-wrong"
    });
  
    toast.present();
    this.need2ConfirmGuess = false;
    this.guessedSwitchId = null;
  }
  
  wantToEndGame() {
    this.need2ConfirmEnd = true;
  }

  endGame() {
    this.need2ConfirmEnd = false;
    this.data.save();
    this.navCtrl.setRoot("RegistrationPage");
    this.navCtrl.popToRoot();
  }

}
