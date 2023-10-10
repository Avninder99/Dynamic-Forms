import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNumberFieldComponent } from './form-number-field.component';

describe('FormNumberFieldComponent', () => {
  let component: FormNumberFieldComponent;
  let fixture: ComponentFixture<FormNumberFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNumberFieldComponent]
    });
    fixture = TestBed.createComponent(FormNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
