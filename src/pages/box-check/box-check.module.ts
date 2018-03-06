import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BoxCheckPage } from './box-check';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BoxCheckPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BoxCheckPage),
    TranslateModule.forChild()
  ],
})
export class BoxCheckPageModule {}
