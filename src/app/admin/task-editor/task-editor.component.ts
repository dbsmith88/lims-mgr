import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {
  @Output() editing = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  saveTask(): void {
    // add new task to tasklist
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
