import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSalesChartComponent } from './annual-sales-chart.component';

describe('AnnualSalesChartComponent', () => {
  let component: AnnualSalesChartComponent;
  let fixture: ComponentFixture<AnnualSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualSalesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
