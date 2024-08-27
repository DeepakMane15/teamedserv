import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLivingRequestComponent } from './view-living-request.component';

describe('ViewLivingRequestComponent', () => {
  let component: ViewLivingRequestComponent;
  let fixture: ComponentFixture<ViewLivingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLivingRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLivingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
