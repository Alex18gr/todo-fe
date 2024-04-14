import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    return this.http.get<PageModel<TodoItemModel>>(this.apiUrl + 'tasks');
  }

  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'tasks/' + id);
  }

}
