import {TodoCategoryModel} from "./todo-category.model";

export interface TodoItemModel {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  category: TodoCategoryModel;
}
