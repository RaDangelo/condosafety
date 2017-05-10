import { LOCALE_ID } from '@angular/core/';
import { ConfigService } from './config.service';
import { RESTService } from './rest.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { PersonServiceInterface, LoginServiceInterface } from './interfaces';
import { PersonService, LoginService } from './services';

import {
  MonitoringComponent, LoginPageComponent, PeopleComponent, AdministrationComponent,
  ReportsComponent
} from './pages/';
import { MessageDialogBehavior } from './behaviors';

@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe,
    MonitoringComponent,
    LoginPageComponent,
    AdministrationComponent,
    PeopleComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ConfigService,
    MessageDialogBehavior,
    { provide: PersonServiceInterface, useClass: PersonService },
    { provide: LoginServiceInterface, useClass: LoginService },
    { provide: RESTService, useClass: RESTService },
    { provide: LOCALE_ID, useValue: `pt-BR` },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
