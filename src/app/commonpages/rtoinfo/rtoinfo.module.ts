
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RtoinfoPageRoutingModule } from './rtoinfo-routing.module';

import { RtoinfoPage } from './rtoinfo.page';

import { SelectlocationComponent } from "./selectlocation/selectlocation.component";

//Language Translation
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
//Map
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RtoinfoPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateConfigService,Geolocation,AndroidPermissions,LocationAccuracy,Screenshot],
  declarations: [SelectlocationComponent,RtoinfoPage],
  entryComponents: [SelectlocationComponent]
})
export class RtoinfoPageModule {}

