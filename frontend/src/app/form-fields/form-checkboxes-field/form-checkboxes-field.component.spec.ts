import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxesFieldComponent } from './form-checkboxes-field.component';

describe('FormCheckboxesFieldComponent', () => {
  let component: FormCheckboxesFieldComponent;
  let fixture: ComponentFixture<FormCheckboxesFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxesFieldComponent]
    });
    fixture = TestBed.createComponent(FormCheckboxesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
