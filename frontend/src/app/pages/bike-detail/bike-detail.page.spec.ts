import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetailPage } from './bike-detail.page';

describe('BikeDetailPage', () => {
  let component: BikeDetailPage;
  let fixture: ComponentFixture<BikeDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeDetailPage]
    });
    fixture = TestBed.createComponent(BikeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
