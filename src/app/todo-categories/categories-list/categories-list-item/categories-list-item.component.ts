import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoCategoryModel} from "../../../shared/models/todo-category.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {TodoCategoriesService} from "../../../shared/services/todo-categories.service";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {HttpErrorResponse} from "@angular/common/http";
import {TodoEditDialogComponent} from "../../../todo-list/todo-edit-dialog/todo-edit-dialog.component";
import {TodoItemModel} from "../../../shared/models/todo-item.model";
import {CategoriesEditDialogComponent} from "../../categories-edit-dialog/categories-edit-dialog.component";

@Component({
  selector: 'app-categories-list-item',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DatePipe,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  templateUrl: './categories-list-item.component.html',
  styleUrl: './categories-list-item.component.scss'
})
export class CategoriesListItemComponent {
  @Output() categoryDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() categoryModified: EventEmitter<TodoCategoryModel> = new EventEmitter<TodoCategoryModel>();
  @Input() category!: TodoCategoryModel;

  loading: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private todoCategoriesService: TodoCategoriesService,
  ) {}

  deletePrompt() {
    // first we check if there is anything associated with this category
    this.todoCategoriesService.checkIfCategoryHasTasks(this.category.id).subscribe({
      next: result => {
        if (result) {
          this.confirmationService.confirm({
            message: 'You cannot delete this category because there are todo tasks associated with it!' +
              ' You need to delete the todo tasks first in order to delete this category.',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'OK',
            rejectVisible: false,
            header: 'Warning'
          });
        } else {
          this.confirmationService.confirm({
            message: 'Do you want to delete todo category "' + this.category.name + '"?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",

            accept: () => {
              this.deleteCategory();
            },
          });
        }
      }
    })


  }

  deleteCategory() {
    this.loading = true;
    this.todoCategoriesService.deleteTodoCategory(this.category.id).subscribe({
      next: () => {
        this.categoryDeleted.emit();
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Error while deleting todo category' });
        this.loading = false;
      }
    })
  }

  editItem() {
    const ref = this.dialogService.open(CategoriesEditDialogComponent, {
      header: 'Edit TODO Category',
      width: '60vw',
      data: {
        editCategory: this.category
      }
    });

    ref.onClose.subscribe({
      next: (v: TodoItemModel) => {
        if (v) {
          this.categoryModified.emit(v);
        }
      }
    });
  }

}
