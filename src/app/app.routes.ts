import { Routes } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoCategoriesComponent} from "./todo-categories/todo-categories.component";

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'categories', component: TodoCategoriesComponent },
];
