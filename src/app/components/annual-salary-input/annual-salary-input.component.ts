import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-annual-salary-input',
  templateUrl: './annual-salary-input.component.html',
  styleUrls: ['./annual-salary-input.component.css']
})
export class AnnualSalaryInputComponent {
  @Output() calculate = new EventEmitter<number>();
  grossSalaryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.grossSalaryForm = this.formBuilder.group({
      grossSalary: [0, [Validators.required, Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)]],
    });
  }

  get grossSalary() { return this.grossSalaryForm.get('grossSalary'); }

  onCalculateClick(): void {
    if (this.grossSalaryForm.valid) {
      this.calculate.emit(this.grossSalary!.value);
    }
  }
}
