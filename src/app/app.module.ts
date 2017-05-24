import { LOCALE_ID } from '@angular/core/';
import { ConfigService } from './config.service';
import { RESTService } from './rest.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {
  PersonServiceInterface, LoginServiceInterface, PersonTypeServiceInterface, AccessServiceInterface, AFKTimeServiceInterface,
  ApartmentServiceInterface, VehicleServiceInterface, WatchControlServiceInterface
} from './interfaces';
import {
  PersonService, LoginService, PersonTypeService, AccessService, AFKTimeService,
  ApartmentService, VehicleService, WatchControlService
} from './services';

import {
  MonitoringComponent, LoginPageComponent, PeopleComponent, AdministrationComponent,
  ReportsComponent, NavbarComponent
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
    ReportsComponent,
    NavbarComponent
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
    { provide: AccessServiceInterface, useClass: AccessService },
    { provide: PersonTypeServiceInterface, useClass: PersonTypeService },
    { provide: AFKTimeServiceInterface, useClass: AFKTimeService },
    { provide: ApartmentServiceInterface, useClass: ApartmentService },
    { provide: VehicleServiceInterface, useClass: VehicleService },
    { provide: WatchControlServiceInterface, useClass: WatchControlService },
    { provide: RESTService, useClass: RESTService },
    { provide: LOCALE_ID, useValue: `pt-BR` },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
