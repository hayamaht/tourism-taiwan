import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeatureComponent } from './card-feature.component';

describe('CardFeatureComponent', () => {
  let component: CardFeatureComponent;
  let fixture: ComponentFixture<CardFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardFeatureComponent]
    });
    fixture = TestBed.createComponent(CardFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
