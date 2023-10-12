import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentFormComponent } from './present-form.component';

describe('PresentFormComponent', () => {
  let component: PresentFormComponent;
  let fixture: ComponentFixture<PresentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentFormComponent]
    });
    fixture = TestBed.createComponent(PresentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
