import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthHandlerComponent } from './oauth-handler.component';

describe('OauthHandlerComponent', () => {
  let component: OauthHandlerComponent;
  let fixture: ComponentFixture<OauthHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OauthHandlerComponent]
    });
    fixture = TestBed.createComponent(OauthHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
