import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnualSalaryInputComponent } from './components/annual-salary-input/annual-salary-input.component';
import { TaxCalculatorComponent } from './components/tax-calculator/tax-calculator.component';
import { TaxCalculationOutputComponent } from './components/tax-calculation-output/tax-calculation-output.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnualSalaryInputComponent,
    TaxCalculatorComponent,
    TaxCalculationOutputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
