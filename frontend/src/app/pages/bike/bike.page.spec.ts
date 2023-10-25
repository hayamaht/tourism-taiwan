import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePage } from './bike.page';

describe('BikePage', () => {
  let component: BikePage;
  let fixture: ComponentFixture<BikePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikePage]
    });
    fixture = TestBed.createComponent(BikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
