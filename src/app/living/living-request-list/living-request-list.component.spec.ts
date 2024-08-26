import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingRequestListComponent } from './living-request-list.component';

describe('LivingRequestListComponent', () => {
  let component: LivingRequestListComponent;
  let fixture: ComponentFixture<LivingRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivingRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivingRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
