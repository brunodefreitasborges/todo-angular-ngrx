import { createReducer, on } from '@ngrx/store';
import { Todo } from '../todo.model';
import { addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo, updateTodo } from './todo.actions';

export interface TodoState {
    todos: Todo[];
    error: string | null;
    status: 'pending' | 'loading' | 'success' | 'error';
}

// Define the initial state
const initialState: TodoState = {
    todos: [{
      id: Date.now().toString(),
      text: 'Implement NgRx',
      completed: false
    }],
    error: null,
    status: 'pending'
}
    


export const todoReducer = createReducer(

  initialState,

  on(addTodo, (state, { content }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), text: content, completed: false }],
  })),
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  on(updateTodo, (state, { id, completed }) => ({
    ...state,
    todos: state.todos.map(todo => todo.id === id ? { ...todo, completed } : todo)
  })),
  on(loadTodos, state => ({
    ...state, status: 'loading'
  })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state, status: 'success', todos, error: null
  })),
  on(loadTodosFailure, (state, { error }) => ({
    ...state, status: 'error', error
  }))

);