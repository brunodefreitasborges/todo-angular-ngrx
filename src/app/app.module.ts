import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { NeonButtonComponent } from './components/neon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoSignals } from './state/todo.signals';

@NgModule({
  declarations: [
    AppComponent,
    NeonButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    TodoService,
    TodoSignals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
