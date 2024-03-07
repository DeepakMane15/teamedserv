import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule} from './chat-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';


@NgModule({
  declarations: [ChatMainComponent, ChatListComponent,ChatWindowComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatIconModule
  ]
})
export class ChatModule { }
