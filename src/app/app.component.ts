import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "RegistrationPage";

  constructor(private translate: TranslateService, private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen, private androidFullScreen: AndroidFullScreen) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.enterPinnedMode();
      this.enterImmersiveMode();
    });
    this.initTranslate();
  }

  /**
	 * enterPinnedMode()
	 */
  enterPinnedMode() {
    if (typeof cordova !== 'undefined') {
      cordova.plugins.screenPinning.enterPinnedMode(
        () => { console.log('entered pinned mode') },
        (error) => { console.log('error when entering pinned mode: ' + error) },
        true
      );
    }
  }

	/**
	 * enterImmersiveMode()
	 */
  enterImmersiveMode() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    const runInBrowser = this.platform.is('core') || this.platform.is('mobileweb');
    if (runInBrowser) {
      this.translate.use('en');
    }
    else {
      this.translate.use('en');
    }
  }

}

