import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditorsComponent } from './manage-editors.component';

describe('ManageEditorsComponent', () => {
  let component: ManageEditorsComponent;
  let fixture: ComponentFixture<ManageEditorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEditorsComponent]
    });
    fixture = TestBed.createComponent(ManageEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
