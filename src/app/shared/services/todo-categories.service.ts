import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoCategoryModel} from "../models/todo-category.model";
import {PageModel} from "../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class TodoCategoriesService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  searchCategoriesByName(name: string): Observable<TodoCategoryModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('name', name);
    return this.http.get<TodoCategoryModel[]>(`${this.apiUrl}task-categories/search-name`, {params: params});
  }

  getTodoCategories(page: number, size: number): Observable<PageModel<TodoCategoryModel>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageModel<TodoCategoryModel>>(this.apiUrl + 'task-categories', { params: params });
  }

  deleteTodoCategory(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'task-categories/' + id);
  }

  checkIfCategoryHasTasks(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + 'task-categories/' + id + '/has-tasks');
  }

  createTodoCategory(editTodoCategory: TodoCategoryModel): Observable<TodoCategoryModel> {
    return this.http.post<TodoCategoryModel>(this.apiUrl + 'task-categories', editTodoCategory);
  }

  editTodoCategory(editTodoCategory: TodoCategoryModel): Observable<TodoCategoryModel> {
    return this.http.put<TodoCategoryModel>(this.apiUrl + 'task-categories/' + editTodoCategory.id, editTodoCategory);
  }
}
