import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioButtonsFieldComponent } from './form-radio-buttons-field.component';

describe('FormRadioButtonsFieldComponent', () => {
  let component: FormRadioButtonsFieldComponent;
  let fixture: ComponentFixture<FormRadioButtonsFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRadioButtonsFieldComponent]
    });
    fixture = TestBed.createComponent(FormRadioButtonsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
