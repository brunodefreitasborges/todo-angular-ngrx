import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './state/todo.model';
import { faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from './services/todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo App - NgRx';
  faTrash = faTrash;
  faTrashArrowUp = faTrashArrowUp;

  todos: WritableSignal<Todo[]> = signal([]);
  form!: FormGroup;

  constructor(private _service: TodoService) {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {
      const contentElement = document.getElementById("content")!;
      contentElement.classList.add("grow-animation");
    });

    this._service.getTodos().subscribe(todos => {
      this.todos.set(todos);
    });

    this.form = new FormGroup({
      content: new FormControl('', [Validators.maxLength(30)])
    })
  }

  addTodo() {
    if (this.form.invalid) return;
    if(this.form.value.content.length == '') return;
    const newTodo: Todo = {id: Date.now().toString(), text: this.form.value.content, completed: false};
    this.todos.update(todos => [...todos, newTodo]);
    this._service.saveTodos(this.todos());
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    this.todos.update(todos => todos.filter(t => t.id !== todo.id));
    this._service.saveTodos(this.todos());
  }

  updateTodo(todo: Todo) {
    this.todos.update(todos => todos.map(todoItem => {
      if(todoItem.id === todo.id) {
        return {...todoItem, completed: !todoItem.completed};
      } else {
        return todoItem;
      }
    }));
    this._service.saveTodos(this.todos());
  }
}

