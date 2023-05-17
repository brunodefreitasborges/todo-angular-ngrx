import { createAction, props } from "@ngrx/store";
import { Todo } from "../todo.model";

// Define the action type and payload using createAction from '@ngrx/store'
export const addTodo = createAction(
    '[Todo] Add Todo',
    props<{ content: string }>()
);

export const removeTodo = createAction(
    '[Todo] Remove Todo',
    props<{ id: string }>()
)

export const updateTodo = createAction(
    '[Todo] Update Todo',
    props<{ id: string, completed: boolean }>()
)

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
    '[Todo] Load Todos Success',
    props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
    '[Todo] Load Todos Failure',
    props<{ error: string }>()
);
