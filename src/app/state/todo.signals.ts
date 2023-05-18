import { Injectable } from "@angular/core";
import { Todo } from "../state/todo.model";
import { WritableSignal } from "@angular/core";
import { signal } from "@angular/core";
import { Injector } from "@angular/core";
import { TodoService } from "../services/todo.service";
import { effect } from "@angular/core";
import { OnInit } from "@angular/core";

@Injectable()
export class TodoSignals {
    constructor(
      private _service: TodoService,
      private injector: Injector
    ) {
      this.todos.set(this._service.getTodos());
      this.start()
    }

    todos: WritableSignal<Todo[]> = signal([]);

    start(): void {
      effect(() => {
        this._service.saveTodos(this.todos());
      }, {injector: this.injector});
    }

    addTodo(newTodo: Todo) {
      this.todos.mutate((todos: Todo[]) => todos.push(newTodo));
    }

    removeTodo(todo: Todo) {
      this.todos.update((todos: Todo[]) => todos.filter(t => t.id !== todo.id));
    }

    updateTodo(todo: Todo) {
      console.log('Updating todo: ', todo);
      this.todos.mutate((todos: Todo[]) => todos.some(todoItem => {
        if (todo.id === todoItem.id) {
          todo.completed = !todo.completed;
          return true;
        }
        return false;
      }));
    }
}
