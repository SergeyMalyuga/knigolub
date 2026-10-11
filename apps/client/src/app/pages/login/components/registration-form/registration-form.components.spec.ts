import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponents } from './registration-form.components';

describe('RegistrationFormComponents', () => {
  let component: RegistrationFormComponents;
  let fixture: ComponentFixture<RegistrationFormComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
