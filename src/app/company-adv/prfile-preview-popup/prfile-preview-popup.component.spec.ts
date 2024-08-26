import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrfilePreviewPopupComponent } from './prfile-preview-popup.component';

describe('PrfilePreviewPopupComponent', () => {
  let component: PrfilePreviewPopupComponent;
  let fixture: ComponentFixture<PrfilePreviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrfilePreviewPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrfilePreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
