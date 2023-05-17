import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Todo } from "../state/todo.model";

@Injectable()
export class TodoService {
    constructor(
    ) {}

    getTodos(): Observable<Todo[]> {
        const todosData = localStorage.getItem('todos');
        if(todosData) {
            const todos: Todo[] = JSON.parse(todosData);
            return of(todos);
        } else {
            return of([]);
        }
    }

    addTodo(todo: Todo): Observable<Todo> {
        const todosData = localStorage.getItem('todos');
        if(todosData) {
            const todos: Todo[] = JSON.parse(todosData);
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            localStorage.setItem('todos', JSON.stringify([todo]));
        }
        return of(todo);
    }

    removeTodo(todo: Todo): Observable<Todo> {
        const todosData = localStorage.getItem('todos');
        if(todosData) {
            const todos: Todo[] = JSON.parse(todosData);
            todos.splice(todos.indexOf(todo), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        return of(todo);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        const todosData = localStorage.getItem('todos');
        if(todosData) {
            const todos: Todo[] = JSON.parse(todosData);
            todos.find(t => t.id === todo.id)!.completed = todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        return of(todo);
    }
}