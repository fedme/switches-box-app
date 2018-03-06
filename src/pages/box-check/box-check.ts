import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli, BoxProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-box-check',
  templateUrl: 'box-check.html',
})
export class BoxCheckPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli, private box: BoxProvider) {

      

  }

  ionViewDidLoad() {
    
  }
  

}
