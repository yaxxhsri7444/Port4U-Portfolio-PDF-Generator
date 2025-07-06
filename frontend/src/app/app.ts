import { Component, Renderer2 } from '@angular/core';
import { Form } from './form/form';

@Component({
  selector: 'app-root',
  imports: [Form],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Port4U';
  constructor(private renderer: Renderer2) {}

  toggleDarkMode() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      this.renderer.removeClass(body, 'dark-theme');
    } else {
      this.renderer.addClass(body, 'dark-theme');
    }
  }
}
