import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormHolderComponent } from './edit-form-holder.component';

describe('EditFormHolderComponent', () => {
  let component: EditFormHolderComponent;
  let fixture: ComponentFixture<EditFormHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormHolderComponent]
    });
    fixture = TestBed.createComponent(EditFormHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
