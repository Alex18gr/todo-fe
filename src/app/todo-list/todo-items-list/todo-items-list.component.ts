import {Component, OnInit} from '@angular/core';
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {TodoItemsService} from "../../shared/services/todo-items.service";
import {TodoItemModel} from "../../shared/models/todo-item.model";
import {PageModel} from "../../shared/models/page.model";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-todo-items-list',
  standalone: true,
  imports: [
    PaginatorModule,
    TodoItemComponent,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './todo-items-list.component.html',
  styleUrl: './todo-items-list.component.scss'
})
export class TodoItemsListComponent implements OnInit {

  loading: boolean = false;
  first: number = 0;
  rows: number = 5;
  totalElements: number = 0;
  todoItems: TodoItemModel[] = [];

  constructor(
    private todoItemsService: TodoItemsService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.reloadItems();
  }

  reloadItems(): void {
    this.loadTodoItems(0, this.rows);
  }

  onPageChange(event: PaginatorState) {
    // implement pagination logic on page change
    this.loadTodoItems(event.page ?? 0, event.rows ?? this.rows);
  }

  loadTodoItems(page: number, size: number): void {
        this.loading = true;
        this.todoItemsService.getTodoItems(page, size).subscribe({
          next: (res: PageModel<TodoItemModel>) => {
            this.first = res.number * res.numberOfElements;
            this.rows = res.size;
            this.todoItems = res.content;
            this.totalElements = res.totalElements;
            this.loading = false;
          },
          error: (next: TodoItemModel) => {
            // handle error
            this.loading = false;
          },
        });
  }

  itemDeleted(item: TodoItemModel) {
    this.reloadItems();
    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
  }
}
