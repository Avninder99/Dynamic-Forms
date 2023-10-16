import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDropdownFieldComponent } from './show-dropdown-field.component';

describe('ShowDropdownFieldComponent', () => {
  let component: ShowDropdownFieldComponent;
  let fixture: ComponentFixture<ShowDropdownFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDropdownFieldComponent]
    });
    fixture = TestBed.createComponent(ShowDropdownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
