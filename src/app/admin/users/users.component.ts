import { Component, OnInit } from '@angular/core';

import { FileManagerService } from 'src/app/services/file-manager.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  editingUser = false;
  columnNames = ['username', 'date-added', 'date-disabled'];
  userList: User[];

  constructor(private fileMgr: FileManagerService, private auth: AuthService) {}

  ngOnInit() {
    this.userList = this.auth.getUsers();
  }

  addUser(): void {
    this.editingUser = true;
  }

  disableUser(): void {
    // disable a user
  }

  isEditing($event): void {
    this.editingUser = $event;
  }
}
