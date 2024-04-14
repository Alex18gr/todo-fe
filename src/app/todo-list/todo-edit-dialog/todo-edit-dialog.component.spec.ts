import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditDialogComponent } from './todo-edit-dialog.component';

describe('TodoEditDialogComponent', () => {
  let component: TodoEditDialogComponent;
  let fixture: ComponentFixture<TodoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
