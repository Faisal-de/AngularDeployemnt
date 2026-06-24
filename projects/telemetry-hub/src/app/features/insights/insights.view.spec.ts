import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsView } from './insights.view';

describe('InsightsView', () => {
  let component: InsightsView;
  let fixture: ComponentFixture<InsightsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsView],
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
