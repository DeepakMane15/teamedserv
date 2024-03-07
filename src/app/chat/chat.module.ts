import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';

@NgModule({
  declarations: [
    ChatMainComponent,
    ChatListComponent,
    ChatWindowComponent,
    ChatMessagesComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, MatIconModule],
})
export class ChatModule {}
