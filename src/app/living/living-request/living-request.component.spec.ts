import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingRequestComponent } from './living-request.component';

describe('LivingRequestComponent', () => {
  let component: LivingRequestComponent;
  let fixture: ComponentFixture<LivingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivingRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
