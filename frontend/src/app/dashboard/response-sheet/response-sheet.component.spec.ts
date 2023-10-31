import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSheetComponent } from './response-sheet.component';

describe('ResponseSheetComponent', () => {
  let component: ResponseSheetComponent;
  let fixture: ComponentFixture<ResponseSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseSheetComponent]
    });
    fixture = TestBed.createComponent(ResponseSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
