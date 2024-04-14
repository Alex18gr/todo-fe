import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEditDialogComponent } from './categories-edit-dialog.component';

describe('CategoriesEditDialogComponent', () => {
  let component: CategoriesEditDialogComponent;
  let fixture: ComponentFixture<CategoriesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
