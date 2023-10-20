import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailPage } from './activity-detail.page';

describe('ActivityPage', () => {
  let component: ActivityDetailPage;
  let fixture: ComponentFixture<ActivityDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActivityDetailPage]
    });
    fixture = TestBed.createComponent(ActivityDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
