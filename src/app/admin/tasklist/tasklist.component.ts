import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { TaskManagerService } from "src/app/services/task-manager.service";

import { Task } from "src/app/models/task.model";
import { Workflow } from "src/app/models/workflow.model";

@Component({
  selector: "app-tasklist",
  templateUrl: "./tasklist.component.html",
  styleUrls: ["./tasklist.component.css"]
})
export class TasklistComponent implements OnInit {
  loadingTasklist: boolean;
  loadingWorkflows: boolean;
  errorMessage: string;

  columnNames = ["task", "workflow", "status", "date", "cancel"];
  taskList: Task[];
  sortableData = new MatTableDataSource();
  workflows: Workflow[];

  constructor(private taskMgr: TaskManagerService, private router: Router) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.loadingTasklist = true;
    this.loadingWorkflows = true;
    this.errorMessage = "";

    this.taskMgr.getTasks().subscribe(
      tasks => {
        if (tasks && tasks.length > 0) {
          this.taskList = [...tasks];
          this.sortableData.data = [...this.taskList];
          this.sortableData.sort = this.sort;
        } else {
          this.errorMessage = "There are currently no Tasks scheduled";
        }
        this.loadingTasklist = false;
      },
      err => {
        console.log(err);
      }
    );
    this.taskMgr.getWorkflows().subscribe(
      workflows => {
        this.workflows = [...workflows];
        this.loadingWorkflows = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  gotoTaskDetail(id: number) {
    this.router.navigateByUrl("/tasks/detail/" + id);
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl("/workflows/detail-by-name/" + name);
  }

  cancelTask(): void {
    console.log("task canceled!");
  }
}
