import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponents } from './hero.components';

describe('HeroComponents', () => {
  let component: HeroComponents;
  let fixture: ComponentFixture<HeroComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
