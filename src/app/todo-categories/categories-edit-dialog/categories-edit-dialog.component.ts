import {Component, OnInit} from '@angular/core';
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoCategoriesService} from "../../shared/services/todo-categories.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TodoCategoryModel} from "../../shared/models/todo-category.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-categories-edit-dialog',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './categories-edit-dialog.component.html',
  styleUrl: './categories-edit-dialog.component.scss'
})
export class CategoriesEditDialogComponent implements OnInit {

  categoryForm: FormGroup | undefined;

  editCategory: TodoCategoryModel | undefined;

  saving: boolean = false;

  constructor(
    private todoCategoriesService: TodoCategoriesService,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.editCategory = this.dialogConfig.data?.editCategory;
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    if (this.editCategory) {
      this.categoryForm.patchValue({
        name: this.editCategory.name,
        description: this.editCategory.description,
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveTodo() {
    if (this.categoryForm?.valid) {
      if (this.editCategory) {
        const formValue = this.categoryForm.getRawValue();
        const editData: TodoCategoryModel = {
          ...this.editCategory,
          name: formValue.name,
          description: formValue.description,
        }
        // edit mode, we call the edit method
        this.saving = true;
        this.todoCategoriesService.editTodoCategory(editData).subscribe({
          next: (savedTodoCategory: TodoCategoryModel) => {
            this.saving = false;
            this.dialogRef.close(savedTodoCategory);
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            console.log(err.error.message);
            this.saving = false;
          }
        });
      } else {
        // save new mode, we call the create method
        const formValue = this.categoryForm.getRawValue();
        const createTodoCategoryData: TodoCategoryModel = {
          id: 0,
          name: formValue.name,
          description: formValue.description,
        };
        this.saving = true;
        this.todoCategoriesService.createTodoCategory(createTodoCategoryData).subscribe({
          next: (savedTodoCategory: TodoCategoryModel) => {
            this.saving = false;
            this.dialogRef.close(savedTodoCategory);
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            console.log(err.error.message);
            this.saving = false;
          }
        });
      }
    }
  }
}
