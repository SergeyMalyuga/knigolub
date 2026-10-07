import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBlockComponent } from './author-block.component';

describe('AuthorBlockComponent', () => {
  let component: AuthorBlockComponent;
  let fixture: ComponentFixture<AuthorBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorBlockComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
