import { Component, effect, Injector, OnInit, signal, WritableSignal } from '@angular/core';
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

  constructor(private _service: TodoService, private injector: Injector) {
    this.todos.set(this._service.getTodos());
  }

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {
      const contentElement = document.getElementById("content")!;
      contentElement.classList.add("grow-animation");
    });

    this.form = new FormGroup({
      content: new FormControl('', [Validators.maxLength(30)])
    })

    effect(() => {
      this._service.saveTodos(this.todos());
    }, {injector: this.injector});
  }

  addTodo() {
    if (this.form.invalid) return;
    if(this.form.value.content.length == '') return;
    const newTodo: Todo = {id: Date.now().toString(), text: this.form.value.content, completed: false};
    this.todos.mutate(todos => todos.push(newTodo));
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    this.todos.update(todos => todos.filter(t => t.id !== todo.id));
  }

  updateTodo(todo: Todo) {
    this.todos.mutate(todos => todos.map(todoItem => {
      if(todoItem.id === todo.id) {
        return {...todoItem, completed: !todoItem.completed};
      } else {
        return todoItem;
      }
    }));
  }
}

