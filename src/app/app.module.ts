import { ConfigService } from './config.service';
import { RESTService } from './rest.service';
import { PessoaServiceInterface } from './interfaces';
import { PessoaService } from './services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules} from '@angular/router';

import { AppComponent } from './app.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ByteFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    // RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ConfigService,
    { provide : PessoaServiceInterface, useClass: PessoaService },
    { provide: RESTService, useClass: RESTService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
