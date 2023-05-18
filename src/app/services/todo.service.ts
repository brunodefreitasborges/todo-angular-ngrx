import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Todo } from "../state/todo.model";

@Injectable()
export class TodoService {
    constructor(
    ) {}

    getTodos(): Todo[] {
        const todosData = localStorage.getItem('todos');
        if(todosData) {
            const todos: Todo[] = JSON.parse(todosData);
            return todos;
        } else {
            return [];
        }
    }

    saveTodos(todos: Todo[]): Todo[] {
      console.log('Todos Changed. Saving todos.')
        localStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    }
}
