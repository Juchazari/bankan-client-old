import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Section, Task } from '../../models';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  host: { 'class': 'section' },
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent {

  @Input()
  set section(section: Section) {
    this._section = section;
    this.tasks = section.tasks;
  }

  get section() {
    return this._section;
  }

  @Output() sectionDelete = new EventEmitter<Section>();

  tasks: Task[];
  addingTask = false;
  newTaskName: string;
  
  private _section: Section;

  setAddingTask(value: boolean) {
    this.addingTask = value;
  }

  onBlurOrEnter(enter?: boolean) {
    const addTask = () => {
      const newTask: Task = { id: 892102, name: this.newTaskName };
      this.tasks.push(newTask);
      this.newTaskName = undefined;
    };

    if (!enter) {
      if (this.newTaskName) {
        addTask();
      }
      this.setAddingTask(false);
    } else if (this.newTaskName) {
      addTask();
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
