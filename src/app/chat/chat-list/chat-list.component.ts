import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  public chatList: any
  @Input() groups: any;

  ngOnInit(): void {
    this.chatList = [{
      name : "User 1",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },
    {
      name : "User 2",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },
    {
      name : "User 3",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 4",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 5",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 6",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 7",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },
    {
      name : "User 8",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 9",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 10",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 11",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },{
      name : "User 12",
      profileImage : "https://app.profmedservices.com/assets/admin/file/documents/profile.png"
    },

  ]
  }
}
