import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesChartComponent } from './product-sales-chart.component';

describe('ProductSalesChartComponent', () => {
  let component: ProductSalesChartComponent;
  let fixture: ComponentFixture<ProductSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSalesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
