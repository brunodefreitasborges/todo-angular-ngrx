import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { NeonButtonComponent } from './components/neon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoStore } from './state/todos.store';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NeonButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
  ],
  providers: [
    TodoStore,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
