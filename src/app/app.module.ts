import { ConfigService } from './config.service';
import { RESTService } from './rest.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules} from '@angular/router';

import { AppComponent } from './app.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';
import { MonitoringComponent } from './monitoring-page/monitoring.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { PessoaServiceInterface, LoginServiceInterface } from './interfaces';
import { PessoaService, LoginService } from './services';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe,
    MonitoringComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot()
    // RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ConfigService,
    { provide : PessoaServiceInterface, useClass: PessoaService },
    { provide : LoginServiceInterface, useClass: LoginService },    
    { provide: RESTService, useClass: RESTService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
