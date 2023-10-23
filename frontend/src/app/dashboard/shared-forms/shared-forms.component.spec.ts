import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormsComponent } from './shared-forms.component';

describe('SharedFormsComponent', () => {
  let component: SharedFormsComponent;
  let fixture: ComponentFixture<SharedFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedFormsComponent]
    });
    fixture = TestBed.createComponent(SharedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
