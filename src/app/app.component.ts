import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './state/todo.model';
import { faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo App - NgRx';
  faTrash = faTrash;
  faTrashArrowUp = faTrashArrowUp;

  allTodos: Todo[] = [{
    id: Date.now().toString(),
    text: 'Learn Angular',
    completed: false
  }]
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {
      const contentElement = document.getElementById("content")!;
      contentElement.classList.add("grow-animation");
    });
    this.form = new FormGroup({
      content: new FormControl('', [Validators.maxLength(30)])
    })
  }

  addTodo() {
    if (this.form.invalid) return;
    if(this.form.value.content.length == '') return;
    this.form.reset();
  }

  removeTodo(todo: Todo) {

  }

  updateTodo(todo: Todo) {

  }
}

