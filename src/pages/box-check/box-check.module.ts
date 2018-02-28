import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BoxCheckPage } from './box-check';

@NgModule({
  declarations: [
    BoxCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(BoxCheckPage),
    TranslateModule.forChild()
  ],
})
export class BoxCheckPageModule {}
