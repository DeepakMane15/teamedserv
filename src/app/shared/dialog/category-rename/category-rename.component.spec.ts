import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRenameComponent } from './category-rename.component';

describe('CategoryRenameComponent', () => {
  let component: CategoryRenameComponent;
  let fixture: ComponentFixture<CategoryRenameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryRenameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
