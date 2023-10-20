import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySelectorComponent } from './city-selector.component';

describe('CitySelectorComponent', () => {
  let component: CitySelectorComponent;
  let fixture: ComponentFixture<CitySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CitySelectorComponent]
    });
    fixture = TestBed.createComponent(CitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
