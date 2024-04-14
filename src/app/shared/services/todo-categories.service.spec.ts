import { TestBed } from '@angular/core/testing';

import { TodoCategoriesService } from './todo-categories.service';

describe('TodoCategoriesService', () => {
  let service: TodoCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
