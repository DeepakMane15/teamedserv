import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSessionsChartComponent } from './store-sessions-chart.component';

describe('StoreSessionsChartComponent', () => {
  let component: StoreSessionsChartComponent;
  let fixture: ComponentFixture<StoreSessionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSessionsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreSessionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
