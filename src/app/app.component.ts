import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarModule} from "./core/navbar/navbar.module";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-fe';
}
