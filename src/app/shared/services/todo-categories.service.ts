import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoCategoryModel} from "../models/todo-category.model";

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
}
