import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNumberFieldComponent } from './show-number-field.component';

describe('ShowNumberFieldComponent', () => {
  let component: ShowNumberFieldComponent;
  let fixture: ComponentFixture<ShowNumberFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowNumberFieldComponent]
    });
    fixture = TestBed.createComponent(ShowNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
