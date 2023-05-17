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

    saveTodos(todos: Todo[]): Observable<void> {
        localStorage.setItem('todos', JSON.stringify(todos));
        return of();
    }
}