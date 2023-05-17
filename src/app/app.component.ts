import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodo, removeTodo, loadTodos, updateTodo } from './state/todos/todo.actions';
import { Observable } from 'rxjs';
import { selectAllTodos } from './state/todos/todo.selectors';
import { AppState } from './state/app.state';
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

  allTodos$: Observable<Todo[]> = this.store.select(selectAllTodos);
  form!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {
      const contentElement = document.getElementById("content")!;
      contentElement.classList.add("grow-animation");
    });

    this.store.dispatch(loadTodos());
    this.form = new FormGroup({
      content: new FormControl('', [Validators.maxLength(30)])
    })
  }

  addTodo() {
    if (this.form.invalid) return;
    if(this.form.value.content.length == '') return;
    this.store.dispatch(addTodo({ content: this.form.value.content }));
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(updateTodo({ id: todo.id, completed: !todo.completed }));
  }
}

