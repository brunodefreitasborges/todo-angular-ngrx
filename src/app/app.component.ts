import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './state/todo.model';
import { faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TodoStore } from './state/todos.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo App - NgRx';
  faTrash = faTrash;
  faTrashArrowUp = faTrashArrowUp;

  allTodos$!: Observable<Todo[]> ;
  form!: FormGroup;

  constructor(private _store: TodoStore) {
    this.allTodos$ = this._store.todos$;
  }

  ngOnInit(): void {
    this._store.fetchTodos();

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
    this._store.addTodo({id: Date.now().toString(), text: this.form.value.content, completed: false });
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    this._store.removeTodo(todo);
  }

  updateTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this._store.updateTodo(todo);
  }
}

