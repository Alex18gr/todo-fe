import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TodoItemComponent} from "./todo-items-list/todo-item/todo-item.component";
import {TodoItemsListComponent} from "./todo-items-list/todo-items-list.component";
import {TodoItemsService} from "../shared/services/todo-items.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ButtonModule,
    TodoItemComponent,
    TodoItemsListComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


}
