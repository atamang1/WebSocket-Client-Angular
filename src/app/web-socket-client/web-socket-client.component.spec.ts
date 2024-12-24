import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketClientComponent } from './web-socket-client.component';

describe('WebSocketClientComponent', () => {
  let component: WebSocketClientComponent;
  let fixture: ComponentFixture<WebSocketClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSocketClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSocketClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
