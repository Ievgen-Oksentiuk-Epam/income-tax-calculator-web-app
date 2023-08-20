import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculation } from 'src/app/models/tax-calculation';

import { TaxCalculationOutputComponent } from './tax-calculation-output.component';
import { By } from '@angular/platform-browser';

describe('TaxCalculationOutputComponent', () => {
  let component: TaxCalculationOutputComponent;
  let fixture: ComponentFixture<TaxCalculationOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxCalculationOutputComponent]
    });
    fixture = TestBed.createComponent(TaxCalculationOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tax calculation when data is provided', () => {
    const taxCalculation: TaxCalculation = {
      grossAnnualSalary: 60000,
      grossMonthlySalary: 5000,
      netAnnualSalary: 48000,
      netMonthlySalary: 4000,
      annualTaxPaid: 1200,
      monthlyTaxPaid: 100,
    };

    component.taxCalculation = taxCalculation;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('p'));
    expect(items.find(p => p.nativeElement.textContent.includes('Gross Annual Salary: £60,000.00'))).toBeDefined();
    expect(items.find(p => p.nativeElement.textContent.includes('Gross Monthly Salary: £5,000.00'))).toBeDefined();
    expect(items.find(p => p.nativeElement.textContent.includes('Net Annual Salary: £48,000.00'))).toBeDefined();
    expect(items.find(p => p.nativeElement.textContent.includes('Net Monthly Salary: £4,000.00'))).toBeDefined();
    expect(items.find(p => p.nativeElement.textContent.includes('Annual Tax Paid: £1,200.00'))).toBeDefined();
    expect(items.find(p => p.nativeElement.textContent.includes('Monthly Tax Paid: £100.00'))).toBeDefined();
  });

  it('should not display tax calculation when data is not provided', () => {
    component.taxCalculation = null;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('p'));
    expect(items.length).toEqual(0);
  });
});
