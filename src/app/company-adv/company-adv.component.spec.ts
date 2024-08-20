import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdvComponent } from './company-adv.component';

describe('CompanyAdvComponent', () => {
  let component: CompanyAdvComponent;
  let fixture: ComponentFixture<CompanyAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyAdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
