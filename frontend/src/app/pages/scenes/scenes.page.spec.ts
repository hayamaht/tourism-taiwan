import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesPage } from './scenes.page';

describe('ScenesPage', () => {
  let component: ScenesPage;
  let fixture: ComponentFixture<ScenesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScenesPage]
    });
    fixture = TestBed.createComponent(ScenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
