import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatToolbarModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { MainComponent } from './main/main.component';
import { TasklistComponent } from './admin/tasklist/tasklist.component';
import { UsersComponent } from './admin/users/users.component';
import { HeaderComponent } from './header/header.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { TaskDetailComponent } from './admin/task-detail/task-detail.component';
import { TaskEditorComponent } from './admin/task-editor/task-editor.component';
import { UserEditorComponent } from './admin/user-editor/user-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MainComponent,
    TasklistComponent,
    UsersComponent,
    HeaderComponent,
    WorkflowsComponent,
    TaskDetailComponent,
    TaskEditorComponent,
    UserEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
