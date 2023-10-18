import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivationComponent } from './account-activation.component';

describe('AccountActivationComponent', () => {
  let component: AccountActivationComponent;
  let fixture: ComponentFixture<AccountActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountActivationComponent]
    });
    fixture = TestBed.createComponent(AccountActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
