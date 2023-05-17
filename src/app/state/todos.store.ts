import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Todo } from "./todo.model";
import { Observable, switchMap } from 'rxjs';
import { TodoService } from "../services/todo.service";

export interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: []
};

@Injectable()
export class TodoStore extends ComponentStore<TodoState> {

    constructor(private _service: TodoService) {
        super(initialState);
    }

    readonly todos$: Observable<Todo[]> = this.select((state) => state.todos);


    setTodos = this.updater((state: TodoState, todos: Todo[]) => {
        return {
            ...state,
            todos
        }
    })

    readonly fetchTodos = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
          switchMap(() => this._service.getTodos()),
          tapResponse(
            (response) => {
              this.patchState({ todos: response });
            },
            (error: string) => {
              console.log(error);
            }
          )
        );
      });
    

    readonly addTodo = this.effect((todo$: Observable<Todo>) => {
        return todo$.pipe(
            switchMap((todo) => this._service.addTodo(todo).pipe(
                tapResponse(
                    (response) => {
                        this.patchState((state) => ({
                            todos: [...state.todos, response]
                          }));
                    },
                    (error: string) => {
                        console.log(error);
                    }
                )
            )
            )
        )
    });

    removeTodo = this.effect((todo$: Observable<Todo>) => {
        return todo$.pipe(
            switchMap((todo) => this._service.removeTodo(todo).pipe(
                tapResponse(
                    (response) => {
                        this.patchState((state) => ({
                            todos: state.todos.filter((t) => t.id !== response.id)
                          }));
                    },
                    (error: string) => {
                        console.log(error);
                    }
                )
            )
            )
        )
    })

    readonly updateTodo = this.effect((todo$: Observable<Todo>) => {
        return todo$.pipe(
          switchMap((todo) => this._service.updateTodo(todo).pipe(
            tapResponse(
              (response) => {
                this.patchState((state) => ({
                  todos: state.todos.map((t) => t.id === response.id ? response : t)
                }));
              },
              (error: string) => {
                console.log(error);
              }
            )
          ))
        );
      });
}