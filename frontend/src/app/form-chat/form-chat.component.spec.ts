import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChatComponent } from './form-chat.component';

describe('FormChatComponent', () => {
  let component: FormChatComponent;
  let fixture: ComponentFixture<FormChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormChatComponent]
    });
    fixture = TestBed.createComponent(FormChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
