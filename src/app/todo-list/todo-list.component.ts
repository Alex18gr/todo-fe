import {Component, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TodoItemComponent} from "./todo-items-list/todo-item/todo-item.component";
import {TodoItemsListComponent} from "./todo-items-list/todo-items-list.component";
import {DialogService} from "primeng/dynamicdialog";
import {TodoEditDialogComponent} from "./todo-edit-dialog/todo-edit-dialog.component";
import {TodoItemModel} from "../shared/models/todo-item.model";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ButtonModule,
    TodoItemComponent,
    TodoItemsListComponent
  ],
  providers: [
    DialogService
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @ViewChild('itemsList') itemsListComponent!: TodoItemsListComponent;

  constructor(
    private dialogService: DialogService,
  ) {}

  openCreateDialog() {
    const ref = this.dialogService.open(TodoEditDialogComponent, {
      header: 'Create TODO Item',
      width: '60vw'
    });

    ref.onClose.subscribe({
      next: (v: TodoItemModel) => {
        if (v) {
          this.itemsListComponent.itemCreated(v);
        }
      }
    });
  }


}
