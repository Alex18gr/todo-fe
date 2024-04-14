import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItemModel} from "../models/todo-item.model";
import {PageModel} from "../models/page.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTodoItems(page: number, size: number): Observable<PageModel<TodoItemModel>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageModel<TodoItemModel>>(this.apiUrl + 'tasks', { params: params });
  }

  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'tasks/' + id);
  }

  createTodoItem(newTodoItem: TodoItemModel): Observable<TodoItemModel> {
    return this.http.post<TodoItemModel>(this.apiUrl + 'tasks', newTodoItem)
  }

  editTodoItem(editTodoItem: TodoItemModel): Observable<TodoItemModel> {
    return this.http.put<TodoItemModel>(this.apiUrl + 'tasks/' + editTodoItem.id, editTodoItem)
  }

}
