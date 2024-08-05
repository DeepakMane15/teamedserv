import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBulkUploadComponent } from './medical-bulk-upload.component';

describe('MedicalBulkUploadComponent', () => {
  let component: MedicalBulkUploadComponent;
  let fixture: ComponentFixture<MedicalBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalBulkUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
