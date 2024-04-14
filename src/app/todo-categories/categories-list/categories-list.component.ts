import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {TodoItemComponent} from "../../todo-list/todo-items-list/todo-item/todo-item.component";
import {CategoriesListItemComponent} from "./categories-list-item/categories-list-item.component";
import {TodoItemModel} from "../../shared/models/todo-item.model";
import {TodoCategoryModel} from "../../shared/models/todo-category.model";
import {TodoItemsService} from "../../shared/services/todo-items.service";
import {MessageService} from "primeng/api";
import {TodoCategoriesService} from "../../shared/services/todo-categories.service";
import {PageModel} from "../../shared/models/page.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    NgForOf,
    PaginatorModule,
    ToastModule,
    TodoItemComponent,
    CategoriesListItemComponent
  ],
  providers: [MessageService],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {

  loading: boolean = false;
  first: number = 0;
  rows: number = 5;
  totalElements: number = 0;
  categories: TodoCategoryModel[] = [];
  page: number = 0;

  constructor(
    private todoCategoriesService: TodoCategoriesService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.reloadItems();
  }

  reloadItems(): void {
    this.loadTodoCategories(0, this.rows);
  }

  reloadItemsCurrentPage() {
    this.loadTodoCategories(this.page, this.rows);
  }

  onPageChange(event: PaginatorState) {
    // implement pagination logic on page change
    this.loadTodoCategories(event.page ?? 0, event.rows ?? this.rows);
  }

  loadTodoCategories(page: number, size: number): void {
    this.loading = true;
    this.todoCategoriesService.getTodoCategories(page, size).subscribe({
      next: (res: PageModel<TodoCategoryModel>) => {
        this.first = (res.number * res.size) + 1;
        this.rows = res.size;
        this.categories = res.content;
        this.totalElements = res.totalElements;
        this.page = res.number;
        this.loading = false;
      },
      error: (next: HttpErrorResponse) => {
        // handle error
        this.loading = false;
      },
    });
  }

  categoryDeleted(item: TodoCategoryModel) {
    this.reloadItems();
    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Category deleted' });
  }

  categoryModified(item: TodoCategoryModel) {
    this.reloadItemsCurrentPage();
    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Category modified' });
  }

  categoryCreated(item: TodoCategoryModel) {
    this.reloadItems();
    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Category created' });
  }

}
