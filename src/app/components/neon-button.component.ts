import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-neon-button',
  template: `
    <a href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ text }}
    </a>`,
  styleUrls: ['./neon-button.component.css']
})
export class NeonButtonComponent{
  @Input() text: string = '';
}

