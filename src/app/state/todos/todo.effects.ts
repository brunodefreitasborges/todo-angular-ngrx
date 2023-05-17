import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { TodoService } from "src/app/services/todo.service";
import { AppState } from "../app.state";
import { loadTodos, loadTodosFailure, loadTodosSuccess, addTodo, updateTodo, removeTodo } from './todo.actions';
import { selectAllTodos } from './todo.selectors';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private todoService: TodoService
    ) {}

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(loadTodos),
        switchMap(() => this.todoService.getTodos().pipe(
            map(todos => loadTodosSuccess({ todos })),
            catchError(error => of(loadTodosFailure({ error })))
        ))));

    saveTodos$ = createEffect(() => this.actions$.pipe(
        ofType(addTodo, removeTodo, updateTodo),
        withLatestFrom(this.store.select(selectAllTodos)),
        switchMap(([action, todos]) => this.todoService.saveTodos(todos))),
        {dispatch: false}
    );
}