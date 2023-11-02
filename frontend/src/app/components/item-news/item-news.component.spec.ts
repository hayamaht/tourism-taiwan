import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNewsComponent } from './item-news.component';

describe('ItemNewsComponent', () => {
  let component: ItemNewsComponent;
  let fixture: ComponentFixture<ItemNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemNewsComponent]
    });
    fixture = TestBed.createComponent(ItemNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
