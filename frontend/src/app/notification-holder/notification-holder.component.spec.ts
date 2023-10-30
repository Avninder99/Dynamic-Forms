import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHolderComponent } from './notification-holder.component';

describe('NotificationHolderComponent', () => {
  let component: NotificationHolderComponent;
  let fixture: ComponentFixture<NotificationHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationHolderComponent]
    });
    fixture = TestBed.createComponent(NotificationHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
