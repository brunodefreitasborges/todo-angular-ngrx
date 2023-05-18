import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './state/todo.model';
import { faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TodoSignals } from './state/todo.signals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo App - NgRx';
  faTrash = faTrash;
  faTrashArrowUp = faTrashArrowUp;

  todos!: WritableSignal<Todo[]>;
  form!: FormGroup;

  constructor(private _todoSignals: TodoSignals) {
    this.todos = _todoSignals.todos;
  }

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
    const newTodo: Todo = {id: Date.now().toString(), text: this.form.value.content, completed: false};
    this._todoSignals.addTodo(newTodo);
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    this._todoSignals.removeTodo(todo);
  }

  updateTodo(todo: Todo) {
    this._todoSignals.updateTodo(todo);
  }
}

