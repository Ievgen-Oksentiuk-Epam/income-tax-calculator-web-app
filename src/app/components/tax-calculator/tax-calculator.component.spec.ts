import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxCalculation } from 'src/app/models/tax-calculation';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-annual-salary-input'
})
class AnnualSalaryInputComponentFake {}

@Component({
  selector: 'app-tax-calculation-output'
})
class TaxCalculationOutputComponentFake {
  @Input() taxCalculation: TaxCalculation | null = null;}

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;
  let taxCalculatorServiceSpy = jasmine.createSpyObj('TaxCalculatorService', ['calculateIncomeTax']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaxCalculatorComponent,
        AnnualSalaryInputComponentFake,
        TaxCalculationOutputComponentFake],
      providers: [{ provide: TaxCalculatorService, useValue: taxCalculatorServiceSpy }]
    });
    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TaxCalculatorService and set taxCalculation', () => {
    const grossAnnualSalary = 60000;
    const taxCalculation: TaxCalculation = {
      grossAnnualSalary: 60000,
      grossMonthlySalary: 5000,
      netAnnualSalary: 48000,
      netMonthlySalary: 4000,
      annualTaxPaid: 1200,
      monthlyTaxPaid: 100,
    };

    taxCalculatorServiceSpy.calculateIncomeTax.and.returnValue(of(taxCalculation));

    component.onCalculate(grossAnnualSalary);

    expect(taxCalculatorServiceSpy.calculateIncomeTax).toHaveBeenCalledWith(grossAnnualSalary);
    expect(component.taxCalculation).toEqual(taxCalculation);
    expect(component.errorPresent).toBeFalse();
  });

  it('should call TaxCalculatorService and show error message in case of error', () => {
    const grossAnnualSalary = 60000;

    taxCalculatorServiceSpy.calculateIncomeTax.and.returnValue(throwError(() => new Error("error")));

    component.onCalculate(grossAnnualSalary);

    expect(taxCalculatorServiceSpy.calculateIncomeTax).toHaveBeenCalledWith(grossAnnualSalary);
    expect(component.errorMessage).toEqual("Failed to calculate tax values.");
    expect(component.errorPresent).toBeTrue();
  });
});