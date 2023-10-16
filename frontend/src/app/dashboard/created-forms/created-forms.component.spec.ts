import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedFormsComponent } from './created-forms.component';

describe('CreatedFormsComponent', () => {
  let component: CreatedFormsComponent;
  let fixture: ComponentFixture<CreatedFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedFormsComponent]
    });
    fixture = TestBed.createComponent(CreatedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
