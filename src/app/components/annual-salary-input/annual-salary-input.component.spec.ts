import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnualSalaryInputComponent } from './annual-salary-input.component';

describe('AnnualSalaryInputComponent', () => {
  let component: AnnualSalaryInputComponent;
  let fixture: ComponentFixture<AnnualSalaryInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualSalaryInputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(AnnualSalaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail validation if input value is null', () => {
    component.grossSalary!.setValue(null);

    expect(component.grossSalary!.hasError('required')).toBeTruthy();
  });

  it('should fail validation if input value is less than 0', () => {
    component.grossSalary!.setValue(-100);

    expect(component.grossSalary!.hasError('pattern')).toBeTruthy();
  });

  it('should fail validation if input value has more than 2 decimal places', () => {
    component.grossSalary!.setValue(2000.345);

    expect(component.grossSalary!.hasError('pattern')).toBeTruthy();
  });

  it('should fail validation if input value is not a number', () => {
    component.grossSalary!.setValue("salary");

    expect(component.grossSalary!.hasError('pattern')).toBeTruthy();
  });

  it('should emit calculateClicked event if input value is correct', () => {
    const expectedGrossSalary = 12000;
    let actualGrossSalary: number | undefined;

    component.calculate.subscribe((value) => (actualGrossSalary = value));

    component.grossSalary!.setValue(expectedGrossSalary);
    component.onCalculateClick();

    expect(actualGrossSalary).toEqual(expectedGrossSalary);
  });

  it('should not emit calculateClicked event if input value is incorrect', () => {
    const grossSalary = -12000;
    let actualGrossSalary: number | undefined;

    component.calculate.subscribe((value) => (actualGrossSalary = value));

    component.grossSalary!.setValue(grossSalary);
    component.onCalculateClick();

    expect(actualGrossSalary).toBeUndefined();
  });
});
