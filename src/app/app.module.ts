import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './ui-kit/loading/loading.component';
import { ReplaceCurrencyPipe } from './utils/pipes/replace-currency.pipe';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [ReplaceCurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
