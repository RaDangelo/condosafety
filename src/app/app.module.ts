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
import {
  MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatOptionModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

import 'hammerjs';

import {
  PersonServiceInterface, LoginServiceInterface, PersonTypeServiceInterface, AccessServiceInterface, AFKTimeServiceInterface,
  ApartmentServiceInterface, VehicleServiceInterface, WatchControlServiceInterface, VisitorServiceInterface
} from './interfaces';
import {
  PersonService, LoginService, PersonTypeService, AccessService, AFKTimeService,
  ApartmentService, VehicleService, WatchControlService, VisitorService
} from './services';

import {
  MonitoringComponent, LoginPageComponent, PeopleComponent, ReportGridComponent, AdministrationComponent,
  ReportsComponent, NavbarComponent, PersonTypeModalComponent, AfkModalComponent, UploadComponent, ImageComponent, VisitorComponent
} from './pages/';
import { MessageDialogBehavior, ImageBehavior } from './behaviors';

import { FileUploadModule } from 'ng2-file-upload';
import { PhonePipe, CpfPipe } from '../app/pipes';

@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe,
    MonitoringComponent,
    LoginPageComponent,
    AdministrationComponent,
    PeopleComponent,
    PhonePipe,
    CpfPipe,
    ReportsComponent,
    NavbarComponent,
    PersonTypeModalComponent,
    UploadComponent,
    AfkModalComponent,
    ImageComponent,
    VisitorComponent,
    ReportGridComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    NgxElectronModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatIconModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ConfigService,
    MessageDialogBehavior,
    ImageBehavior,
    { provide: PersonServiceInterface, useClass: PersonService },
    { provide: LoginServiceInterface, useClass: LoginService },
    { provide: AccessServiceInterface, useClass: AccessService },
    { provide: PersonTypeServiceInterface, useClass: PersonTypeService },
    { provide: AFKTimeServiceInterface, useClass: AFKTimeService },
    { provide: ApartmentServiceInterface, useClass: ApartmentService },
    { provide: VehicleServiceInterface, useClass: VehicleService },
    { provide: WatchControlServiceInterface, useClass: WatchControlService },
    { provide: VisitorServiceInterface, useClass: VisitorService },
    { provide: RESTService, useClass: RESTService },
    { provide: LOCALE_ID, useValue: `pt-BR` },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
