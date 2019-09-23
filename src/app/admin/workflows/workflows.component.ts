import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { FileManagerService } from '../../services/file-manager.service';

import { Workflow } from '../../models/workflow.model';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  columnNames = ['name', 'processor', 'input-path', 'output-path', 'frequency'];
  workflows: Workflow[];

  constructor(private fileMgr: FileManagerService, private router: Router) {}

  ngOnInit() {
    this.workflows = this.fileMgr.getWorkflows();
  }

  addWorkflow(): void {}

  gotoWorkflowDetail(id: number) {
    this.router.navigateByUrl('/workflows/detail/' + id);
  }
}
