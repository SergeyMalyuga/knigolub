import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUserComponent } from './online-user.component';

describe('OnlineUserComponent', () => {
  let component: OnlineUserComponent;
  let fixture: ComponentFixture<OnlineUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
