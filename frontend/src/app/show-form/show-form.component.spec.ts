import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFormComponent } from './show-form.component';

describe('ShowFormComponent', () => {
  let component: ShowFormComponent;
  let fixture: ComponentFixture<ShowFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFormComponent]
    });
    fixture = TestBed.createComponent(ShowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
