import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTextFieldComponent } from './show-text-field.component';

describe('ShowTextFieldComponent', () => {
  let component: ShowTextFieldComponent;
  let fixture: ComponentFixture<ShowTextFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTextFieldComponent]
    });
    fixture = TestBed.createComponent(ShowTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
