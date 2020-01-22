import { Component, OnInit } from "@angular/core";

import { Processor } from "src/app/models/processor.model";
import { TaskManagerService } from "src/app/services/task-manager.service";

@Component({
  selector: "app-processors",
  templateUrl: "./processors.component.html",
  styleUrls: ["./processors.component.css"]
})
export class ProcessorsComponent implements OnInit {
  loadingProcessors: boolean;
  errorMessage: string;
  addingProcessor: boolean;

  columnNames = ["name", "description", "file_type"];
  processors: Processor[];

  constructor(private fileMgr: TaskManagerService) {}

  ngOnInit() {
    this.loadingProcessors = true;
    this.errorMessage = "";
    this.addingProcessor = false;
    this.processors = [];

    this.fileMgr.getProcessors().subscribe(processors => {
      if (processors && processors.length > 0) {
        this.processors = [...processors];
      } else {
        this.errorMessage = "There are currently no Processors installed.";
      }
      this.loadingProcessors = false;
    });
  }

  addProcessor() {
    this.addingProcessor = true;
  }

  isAdding($event) {
    this.addingProcessor = $event;
  }
}
