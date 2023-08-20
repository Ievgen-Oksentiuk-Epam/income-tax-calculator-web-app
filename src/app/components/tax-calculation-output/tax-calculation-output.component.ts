import { Component, Input } from '@angular/core';
import { TaxCalculation } from 'src/app/models/tax-calculation';

@Component({
  selector: 'app-tax-calculation-output',
  templateUrl: './tax-calculation-output.component.html',
  styleUrls: ['./tax-calculation-output.component.css']
})
export class TaxCalculationOutputComponent {
  @Input() taxCalculation: TaxCalculation | null = null;
}
