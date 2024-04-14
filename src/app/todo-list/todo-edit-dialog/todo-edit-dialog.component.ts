import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {TodoCategoriesService} from "../../shared/services/todo-categories.service";
import {TodoCategoryModel} from "../../shared/models/todo-category.model";
import {NgIf} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TodoItemModel} from "../../shared/models/todo-item.model";
import {TodoItemsService} from "../../shared/services/todo-items.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-todo-edit-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    CalendarModule,
    AutoCompleteModule,
    NgIf
  ],
  templateUrl: './todo-edit-dialog.component.html',
  styleUrl: './todo-edit-dialog.component.scss'
})
export class TodoEditDialogComponent implements OnInit {

  suggestions: string[] = [];

  todoForm: FormGroup | undefined;

  editTodoItem: TodoItemModel | undefined;

  saving: boolean = false;

  constructor(
    private todoCategoriesService: TodoCategoriesService,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private todoItemsService: TodoItemsService
  ) {
    this.editTodoItem = this.dialogConfig.data?.editTodoItem;
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      deadline: new FormControl(''),
      categoryName: new FormControl(''),
    });

    if (this.editTodoItem) {
      this.todoForm.patchValue({
        name: this.editTodoItem.name,
        description: this.editTodoItem.description,
        deadline: new Date(this.editTodoItem.deadline),
        categoryName: this.editTodoItem.category.name
      })
    }
  }

  searchCategory(event: AutoCompleteCompleteEvent) {
    this.todoCategoriesService.searchCategoriesByName(event.query).subscribe({
      next: (categories: TodoCategoryModel[]) => {
        this.suggestions = categories.map((category) => category.name);
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveTodo() {
    if (this.editTodoItem) {
      const formValue = this.todoForm?.getRawValue();
      const editData: TodoItemModel = {
        ...this.editTodoItem,
        name: formValue.name,
        description: formValue.description,
        deadline: formValue.deadline,
        category: {
          ...this.editTodoItem.category,
          name: formValue.categoryName
        }
      }
      // edit mode, we call the edit method
      this.saving = true;
      this.todoItemsService.editTodoItem(editData).subscribe({
        next: (savedTodoItem: TodoItemModel) => {
          this.saving = false;
          this.dialogRef.close(savedTodoItem);
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
        }
      });
    } else {
      // save new mode, we call the create method
      const formValue = this.todoForm?.getRawValue();
      const createTodoData: TodoItemModel = {
        id: 0,
        name: formValue.name,
        description: formValue.description,
        deadline: formValue.deadline,
        category: {
          id: 0,
          name: formValue.categoryName,
          description: ''
        }
      };
      this.saving = true;
      this.todoItemsService.createTodoItem(createTodoData).subscribe({
        next: (savedTodoItem: TodoItemModel) => {
          this.saving = false;
          this.dialogRef.close(savedTodoItem);
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
        }
      });
    }
  }
}
