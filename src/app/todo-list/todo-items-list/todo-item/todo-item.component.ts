import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoItemModel} from "../../../shared/models/todo-item.model";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {TodoItemsService} from "../../../shared/services/todo-items.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {TodoEditDialogComponent} from "../../todo-edit-dialog/todo-edit-dialog.component";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    DatePipe,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Output() todoDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() todoModified: EventEmitter<TodoItemModel> = new EventEmitter<TodoItemModel>();
  @Input() todoItem!: TodoItemModel;

  loading: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private todoItemsService: TodoItemsService,
    private dialogService: DialogService
  ) {}

  deletePrompt() {
    this.confirmationService.confirm({
      message: 'Do you want to delete todo item "' + this.todoItem.name + '"?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",

      accept: () => {
        this.deleteTodo();
      },
    });
  }

  deleteTodo() {
    this.loading = true;
    this.todoItemsService.deleteTodoItem(this.todoItem.id).subscribe({
      next: () => {
        this.todoDeleted.emit();
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Error while deleting todo item' });
        this.loading = false;
      }
    })
  }

  editItem() {
    const ref = this.dialogService.open(TodoEditDialogComponent, {
      header: 'Edit TODO Item',
      width: '60vw',
      data: {
        editTodoItem: this.todoItem
      }
    });

    ref.onClose.subscribe({
      next: (v: TodoItemModel) => {
        if (v) {
          this.todoModified.emit(v);
        }
      }
    })
  }


}
