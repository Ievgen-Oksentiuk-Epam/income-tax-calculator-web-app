import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TaxCalculation } from '../models/tax-calculation';
import { environment } from 'src/environments/environment';
import { TaxCalculatorService } from './tax-calculator.service';

describe('TaxCalculatorService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)

    service = TestBed.inject(TaxCalculatorService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HTTP POST and return data', () => {
    const grossAnnualSalary = 60000;
    const taxCalculation: TaxCalculation = {
      grossAnnualSalary: 60000,
      grossMonthlySalary: 5000,
      netAnnualSalary: 48000,
      netMonthlySalary: 4000,
      annualTaxPaid: 1200,
      monthlyTaxPaid: 100,
    };

    service.calculateIncomeTax(grossAnnualSalary)
    .subscribe(data =>
      expect(data).toEqual(taxCalculation)
    );

    const req = httpTestingController.expectOne(environment.taxCalculatorApiUrl + "CalculateIncomeTax");

    expect(req.request.method).toEqual('POST');

    req.flush(taxCalculation);
  });
});
