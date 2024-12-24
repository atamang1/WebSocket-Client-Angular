import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketClientComponent } from './web-socket-client/web-socket-client.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WebSocketClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WebSocketClient';
}
