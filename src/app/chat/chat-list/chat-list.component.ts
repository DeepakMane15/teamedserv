import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  public chatList: any
  @Input() groups: any;
  @Output() newItemEvent = new EventEmitter<string>();

  ngOnInit(): void {

  }
  selectGroup(value: any) {
    this.newItemEvent.emit(value);
  }
}
