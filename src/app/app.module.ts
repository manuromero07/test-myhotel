import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarState } from './states/car.state';
import { LoadingComponent } from './ui-kit/loading/loading.component';
import { ReplaceCurrencyPipe } from './utils/pipes/replace-currency.pipe';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxsModule.forRoot([CarState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: [CarState] }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [ReplaceCurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
