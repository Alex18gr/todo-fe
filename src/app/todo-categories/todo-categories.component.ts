import {Component, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TodoItemsListComponent} from "../todo-list/todo-items-list/todo-items-list.component";
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {CategoriesEditDialogComponent} from "./categories-edit-dialog/categories-edit-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {TodoCategoryModel} from "../shared/models/todo-category.model";

@Component({
  selector: 'app-todo-categories',
  standalone: true,
  imports: [
    ButtonModule,
    TodoItemsListComponent,
    CategoriesListComponent
  ],
  providers: [DialogService],
  templateUrl: './todo-categories.component.html',
  styleUrl: './todo-categories.component.scss'
})
export class TodoCategoriesComponent {
  @ViewChild('categoriesList') categoriesListComponent!: CategoriesListComponent;

  constructor(
    private dialogService: DialogService,
  ) {}

  openCreateDialog() {
    const ref = this.dialogService.open(CategoriesEditDialogComponent, {
      header: 'Create TODO Category',
      width: '60vw',
    });

    ref.onClose.subscribe({
      next: (v: TodoCategoryModel) => {
        if (v) {
          this.categoriesListComponent.categoryCreated(v);
        }
      }
    });
  }
}
