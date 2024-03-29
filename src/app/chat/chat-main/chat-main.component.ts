import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit {
  public groups: any = [];
  public selectedGroup!: any;
  public showSpinner: boolean = false;
  public userProfile: any;
  constructor(
    private _chatService: ChatService,
    private _apiServices: ApiService,
    private _authService: AuthService,
    public dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.userProfile = this._authService.getUserData();
    this.fetGroups();
    this.getParticipants();
    // alert(this.userProfile.id)
  }

  fetGroups(): void {
    this._chatService
      .getAll(this.userProfile.id)
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
        this.groups.push(...data);
      });
  }

  getGroup(newItem: any) {
    this.selectedGroup = newItem;
  }

  getParticipants() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_PARTICIPANTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.groups.push(...res.data);
        } else {
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  public createGroup(): void {
    const userProfile = this._authService.getUserData();
    const dialogRef = this.dialog.open(CreateGroupModalComponent, {
      data: this.groups,
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
      // height: '800px', // Set height to 400 pixels
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }
}
