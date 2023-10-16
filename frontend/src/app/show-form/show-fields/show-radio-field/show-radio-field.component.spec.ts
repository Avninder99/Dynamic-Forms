import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRadioFieldComponent } from './show-radio-field.component';

describe('ShowRadioFieldComponent', () => {
  let component: ShowRadioFieldComponent;
  let fixture: ComponentFixture<ShowRadioFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRadioFieldComponent]
    });
    fixture = TestBed.createComponent(ShowRadioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
