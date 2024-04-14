import {Component, Input} from '@angular/core';
import {TodoItemModel} from "../../../shared/models/todo-item.model";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todoItem!: TodoItemModel;

}
