import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TestPage } from './test';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TestPage),
    TranslateModule.forChild()
  ],
})
export class BoxCheckPageModule {}
