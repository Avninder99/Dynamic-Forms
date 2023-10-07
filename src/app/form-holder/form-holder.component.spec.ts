import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHolderComponent } from './form-holder.component';

describe('FormHolderComponent', () => {
  let component: FormHolderComponent;
  let fixture: ComponentFixture<FormHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormHolderComponent]
    });
    fixture = TestBed.createComponent(FormHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
