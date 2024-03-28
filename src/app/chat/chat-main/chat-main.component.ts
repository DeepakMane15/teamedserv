import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent implements OnInit {

  public groups!: any;
  public selectedGroup!: any;
  constructor (private _chatService: ChatService) {}
  ngOnInit() {
    this.fetGroups()
  }

  fetGroups(): void {
    this._chatService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groups = data;
      console.log(data)
    });
  }

  getGroup(newItem: any) {
    this.selectedGroup = newItem;
    console.log("from main : ", newItem);
  }
}
