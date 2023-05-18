import { Injectable } from "@angular/core";
import { Todo } from "../state/todo.model";
import { WritableSignal } from "@angular/core";
import { signal } from "@angular/core";
import { Injector } from "@angular/core";
import { TodoService } from "../services/todo.service";
import { effect } from "@angular/core";

@Injectable()
export class TodoSignals {
    /**
     * Initializes the TodoSignals class with a TodoService instance and an Injector instance.
     * Sets the initial value of the todos WritableSignal and starts the effect to save todos to the service.
     * @param _service - The TodoService instance to use.
     * @param injector - The Injector instance to use.
     */
    constructor(
      private _service: TodoService,
      private injector: Injector
    ) {
      this.todos.set(this._service.getTodos());
      this.start()
    }

    /**
     * A WritableSignal that holds an array of Todo items.
     */
    todos: WritableSignal<Todo[]> = signal([]);

    /**
     * Starts an effect that saves the todos to the service.
     */
    start(): void {
      effect(() => {
        this._service.saveTodos(this.todos());
      }, {injector: this.injector});
    }

    /**
     * Adds a new Todo item to the todos WritableSignal.
     * @param newTodo - The new Todo item to add.
     */
    addTodo(newTodo: Todo) {
      this.todos.mutate((todos: Todo[]) => todos.push(newTodo));
    }

    /**
     * Removes a Todo item from the todos WritableSignal.
     * @param todo - The Todo item to remove.
     */
    removeTodo(todo: Todo) {
      this.todos.update((todos: Todo[]) => todos.filter(t => t.id !== todo.id));
    }

    /**
     * Updates a Todo item in the todos WritableSignal.
     * @param todo - The Todo item to update.
     */
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
