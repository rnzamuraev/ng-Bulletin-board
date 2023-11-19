import { NgModule } from "@angular/core";
import { CustomCurrencyPipe } from "./custom-currency/custom-currency.pipe";
import { CustomDatePipe } from "./custom-date/custom-date.pipe";

@NgModule({
  declarations: [
    // FilterCategoriesPipe,
    // FormErrorsPipe,
    // CustomCurrencyPipe,

    CustomDatePipe,
  ],
  imports: [],
  exports: [
    // FilterCategoriesPipe,
    // FormErrorsPipe,
    // CustomCurrencyPipe,
  ],
})
export class PipesModule {}
