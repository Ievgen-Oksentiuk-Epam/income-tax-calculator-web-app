import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaxCalculation } from '../models/tax-calculation';
import { environment } from 'src/environments/environment';

const httpOptions: Object = {
  observe: 'body',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  constructor(private http: HttpClient) { }

  calculateIncomeTax(grossSalary: number) {
    return this.http.post<TaxCalculation>(environment.taxCalculatorApiUrl + "CalculateIncomeTax", grossSalary, httpOptions);
  }
}
