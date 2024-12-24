import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {
  private socket$!: WebSocket; // Declare a WebSocket object for the connection

  constructor() {}

  // Method to establish a WebSocket connection and start listening for messages 
  // Returns an observable that emits messages received from the WebSocket server 
  connect(): Observable<any> {
    // Check if we are in the browser environment (and WebSocket is available) 

    return new Observable( observer => {
      // Create a new WebSocket connection to the server
      this.socket$ = new WebSocket('ws://localhost:5053/ws');

      // Event handler when WebSocket connection is successfully established
      this.socket$.onopen = () => {
        console.log('WebSocket connection established.');
        //this.socket$.send('Hello from Angular');
      };

      this.socket$.onmessage = (event: MessageEvent) => {
        console.log('Received message here:', event.data);

      // this.messageReceived.next(event.data);
      observer.next(event.data); // Emit received message to subscribers 

      };

      //Event handler when WebSocket connection is closed 
      this.socket$.onclose = (event: CloseEvent) => {
        console.log('WebSocket connection closed:', event);
        observer.complete(); // Notify that the WebSocket connection is closed
      };

      //Event handler for WebSocket error events
      this.socket$.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
        observer.error(error); // Propagate the error to the subscriber
      };

    });

  }
  
  

  sendMessage(message: string): void {
    // If message is an object, serialize it to a JSON string before sending
    if (this.socket$ && this.socket$.readyState === WebSocket.OPEN) {
      this.socket$.send(message);  // Send message only if WebSocket is open
    } else {
      console.error('WebSocket is not open');
    }
  }
  
  disconnectWebSocket(): void {
    if(this.socket$)
    {
      this.socket$.close();
    }
  }


}
