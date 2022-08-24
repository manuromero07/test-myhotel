import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReplaceCurrencyPipe } from './replace-currency.pipe';

@NgModule({
  declarations: [ReplaceCurrencyPipe],
  imports: [CommonModule],
  exports: [ReplaceCurrencyPipe],
  providers: [DecimalPipe],
})
export class PipesModule {}
