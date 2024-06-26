import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCategoriesComponent } from './todo-categories.component';

describe('TodoCategoriesComponent', () => {
  let component: TodoCategoriesComponent;
  let fixture: ComponentFixture<TodoCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
