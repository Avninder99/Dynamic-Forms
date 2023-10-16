import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCheckboxFieldComponent } from './show-checkbox-field.component';

describe('ShowCheckboxFieldComponent', () => {
  let component: ShowCheckboxFieldComponent;
  let fixture: ComponentFixture<ShowCheckboxFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCheckboxFieldComponent]
    });
    fixture = TestBed.createComponent(ShowCheckboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
