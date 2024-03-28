import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent implements OnInit {
  @Input() group: any;
  public messages: any;
  public message!: string;
  public userProfile!: any;
  constructor(private _chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
    this.userProfile = this.authService.getUserData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('group' in changes && this.group) {
      this.fetchMessages();
    }
  }

  fetchMessages(): void {
    this._chatService
      .getAllMessages(this.group.id)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.messages = data;
      });
  }

  public sendMessage() {
    let msgObj = {
      senderId: this.userProfile.id,
      message: this.message,
      participants: this.group?.type === 'group' ? this.group.members : [this.userProfile.id,1],
      groupId: this.group?.type === 'group' ? this.group.id : 1,
      type: this.group.id ? 'group' : 'individual',
      timestamp: new Date(),
    };
    this._chatService.sendMessage(msgObj);
  }
}
