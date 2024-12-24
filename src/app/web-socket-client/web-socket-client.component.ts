import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { WebSocketClientService } from '../web-socket-client.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-web-socket-client',
  imports: [CommonModule],
  templateUrl: './web-socket-client.component.html',
  styleUrl: './web-socket-client.component.scss',
  providers: [WebSocketClientService] 
})
export class WebSocketClientComponent  implements OnInit, OnDestroy, AfterViewInit {

  receivedMessages: any; 
  private dataSubscription: Subscription = new Subscription(); 
  private scrollContainer: HTMLElement | null = null; // Reference to the scroll container 
  private display1: HTMLElement | null = null; //Reference to Display 1 container
  private display2: HTMLElement | null = null; // Reference to Display 2 container 
  private display3: HTMLElement | null = null; // Reference to Display 3 container 
  private display4: HTMLElement | null = null; // Reference to Display 4 container
  private dotElement:HTMLElement | null = null; // Reference to Dots 

  constructor(private webSocketClientService: WebSocketClientService) {}

  ngOnInit(): void {
    this.getData(); 
  }  

  // Get data from the websocket
  getData(): void {

    this.dataSubscription = this.webSocketClientService.connect().subscribe (
      {
        next: (data: string) => {
          //console.log('Received WebSocket message:', data);  
          this.receivedMessages = JSON.parse(data);     // JSON string to JSON object 
          console.log('Received WebSocket message here:', this.receivedMessages);  

         }, 
        error: (error: any) => {
          console.error("Error fetching data", error);
        }
      }
    );

  }
  
  // Method: to send data to WebSocket
  sendMessage(): void {
    const message = 'Hello, WebSocket!'; 
    this.webSocketClientService.sendMessage(message);
  }

  
  ngAfterViewInit(): void {
    // Reference to the HTML elements 
    this.scrollContainer = document.getElementById("scroll-container") as HTMLElement;
    this.display1 = document.querySelector(".display1") as HTMLElement; 
    this.display2 = document.querySelector(".display2") as HTMLElement; 
    this.display3 = document.querySelector(".display3") as HTMLElement; 
    this.display4 = document.querySelector(".display4") as HTMLElement; 

    // Create an interaction observer to detect when the divs are in the viewport 
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // Check if the observed element is in the viewport 
        if(entry.isIntersecting) {
          console.log(`Element ${entry.target.className} is in the viewport.`); 
          //  (entry.target as HTMLElement).style.backgroundColor = 'blue'; 
          switch(entry.target.className)
          {
            case 'display1 display-container': 
            this.dotElement = document.querySelector('.dot1') as HTMLElement; 
            break;
            case 'display2 display-container': 
            this.dotElement = document.querySelector('.dot2') as HTMLElement; 
            break;
            case 'display3 display-container': 
            this.dotElement = document.querySelector('.dot3') as HTMLElement; 
            break; 
            case 'display4 display-container': 
            this.dotElement = document.querySelector('.dot4') as HTMLElement; 
            break; 
            case 'default': 
            break;
          }

          // If a dot element is found, change its style 
          if(this.dotElement) {
            this.dotElement.style.backgroundColor = 'white';
            this.dotElement.style.borderColor = 'white';
          }


        } else {
          //If out of the viewport 
          console.log(`Element ${entry.target.className} is out of the viewport.`);

           switch(entry.target.className)
          {
            case 'display1 display-container': 
            this.dotElement = document.querySelector('.dot1') as HTMLElement; 
            break;
            case 'display2 display-container': 
            this.dotElement = document.querySelector('.dot2') as HTMLElement; 
            break;
            case 'display3 display-container': 
            this.dotElement = document.querySelector('.dot3') as HTMLElement; 
            break; 
            case 'display4 display-container': 
            this.dotElement = document.querySelector('.dot4') as HTMLElement; 
            break; 
            case 'default': 
            break;
          }

          if(this.dotElement) {
            this.dotElement.style.backgroundColor = 'grey';
            this.dotElement.style.borderColor = 'grey';
          }
        }
      });

    }, { threshold: 0.5});

    // Check if the display elements exists before observing them 
    if (this.display1) observer.observe(this.display1); 
    if (this.display2) observer.observe(this.display2); 
    if (this.display3) observer.observe(this.display3); 
    if (this.display4) observer.observe(this.display4); 



    if(this.scrollContainer)
    {
      this.addDragToScrollFeature(); 
    }
  }


  // Method: makes display container draggable 
  private addDragToScrollFeature():void {
    let isDragging = false; 
    let startX: number = 0; 
    let scrollLeft:  number =0; 

    if(this.scrollContainer) 
    {
      this.scrollContainer.addEventListener('mousedown', (e: MouseEvent) => {
        isDragging = true; 
        startX = e.pageX - this.scrollContainer!.offsetLeft; //Get mouse position
        scrollLeft = this.scrollContainer!.scrollLeft; // Get current scroll position
        this.scrollContainer!.style.cursor = 'grabbing'; // Change cursor to grabbing
      });

      this.scrollContainer.addEventListener('mousemove', (e: MouseEvent)=> {
        if(!isDragging) return; // if not dragging, do nothing 
        const x = e.pageX - this.scrollContainer!.offsetLeft; 
        const walk = (x - startX)*1; //Speed of scrolling (multiply for faster scrolling)
        this.scrollContainer!.scrollLeft = scrollLeft - walk; // scroll the container
      }); 

      this.scrollContainer.addEventListener('mouseup', () => {
        isDragging = false; 
        this.scrollContainer!.style.cursor = 'grab'; // Change cursor back to grab
      }); 

      this.scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false; 
        this.scrollContainer!.style.cursor = 'grab'; 
      })
    }
  }

  ngOnDestroy(): void {
    this.webSocketClientService.disconnectWebSocket();
    if(this.dataSubscription){
      this.dataSubscription.unsubscribe();
    }
  }

 
}
