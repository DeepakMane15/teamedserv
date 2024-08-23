import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvFormPopupComponent } from './adv-form-popup.component';

describe('AdvFormPopupComponent', () => {
  let component: AdvFormPopupComponent;
  let fixture: ComponentFixture<AdvFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
