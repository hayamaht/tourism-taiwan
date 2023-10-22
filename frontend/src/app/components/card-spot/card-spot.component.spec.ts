import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSpotComponent } from './card-spot.component';

describe('CardSpotComponent', () => {
  let component: CardSpotComponent;
  let fixture: ComponentFixture<CardSpotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardSpotComponent]
    });
    fixture = TestBed.createComponent(CardSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
