import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
  public messages :any =[{
    "sender":"User 1",
    "message" : "Hello this is my message",
    "timing" : "3.00pm",
    "isUser" : true
  }, {
    "sender":"Elon Musk",
    "message" : "Hello this is my message",
    "timing" : "3.00pm",
    "isUser" : false
  }]
}
