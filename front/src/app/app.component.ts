import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NbCardModule, NbChatModule, NbLayoutModule } from '@nebular/theme';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NbChatModule, NbLayoutModule, NbCardModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ws = new WebSocket('ws://localhost:8080/chat');
  user: string = '';
  status = '';
  @ViewChild('userForm') userForm!: NgForm;
  sentMessageIds = new Set<string>();
  messages: any[] = [];

  ngOnInit() {
    this.handleSocketEvents();
  }

  ngOnDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  }

  onSubmit() {
    this.user = this.userForm.value.user
  }

  handleSocketEvents() {
    this.ws.onopen = (event: any) => {
      console.log(event);
      this.status = 'Connection established: ' + event.target.url;
    };
    this.ws.onerror = (event: Event) => {
      console.log(event);
      this.status = 'Error encountered';
    };
    this.ws.onclose = (event: CloseEvent) => {
      console.log(event);
      this.status = 'Closed connection';
    };
    this.ws.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data)
      console.log('Received message: ', data);
      if (!this.sentMessageIds.has(data.id)) {
        this.broadcastMessage(data);
      }
    };
  }

  broadcastMessage(data: any) {
    this.messages.push({
      text: data.content,
      date: new Date(),
      reply: false,
      user: {
        name: data.sender,
        avatar: 'https://picsum.photos/200'
      },
    });
  }

  sendMessage(event: any, userName: string) {
    const messageId = uuidv4();
    this.sentMessageIds.add(messageId);

    const newMessage = {
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: userName,
        avatar: 'https://picsum.photos/200',
      },
    };
    this.messages.push(newMessage);

    const payload = {
      id: messageId,
      content: event.message,
      sender: userName
    };
    this.ws.send(JSON.stringify(payload)); 
  }
}
