import { Component } from '@angular/core';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { TaxCalculation } from 'src/app/models/tax-calculation';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent {
  taxCalculation: TaxCalculation | null = null;
  errorPresent: boolean = false;
  errorMessage: string | null = null;

  constructor(private taxCalculatorService: TaxCalculatorService) { }

  onCalculate(grossSalary: number) {
    this.taxCalculatorService.calculateIncomeTax(grossSalary).subscribe({
      next: (taxCalculation) => {
        this.taxCalculation = taxCalculation;
        this.errorPresent = false;
      },
      error: (error) => {
        console.error(error);

        this.errorMessage = "Failed to calculate tax values.";
        this.errorPresent = true;
      }
    });
  }
}
