import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultipleOptionsFieldComponent } from './form-multiple-options-field.component';

describe('FormMultipleOptionsFieldComponent', () => {
  let component: FormMultipleOptionsFieldComponent;
  let fixture: ComponentFixture<FormMultipleOptionsFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMultipleOptionsFieldComponent]
    });
    fixture = TestBed.createComponent(FormMultipleOptionsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
