import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBikeRouteComponent } from './card-bike-route.component';

describe('CardBikeRouteComponent', () => {
  let component: CardBikeRouteComponent;
  let fixture: ComponentFixture<CardBikeRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardBikeRouteComponent]
    });
    fixture = TestBed.createComponent(CardBikeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
