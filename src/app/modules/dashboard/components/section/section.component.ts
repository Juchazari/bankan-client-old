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

  @Input() section: Section;

  @Output() sectionDelete = new EventEmitter<Section>();

  addingTask = false;
  newTaskName: string;

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

@Component({
  selector: 'section-header',
  template: `
    <div class="section-header">
      <h3 class="section-title">{{ section.name }}</h3>
      
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>more_horiz</mat-icon>
      </button>
      <button [disabled]="addingTask" mat-icon-button matTooltip="Add Task">
        <mat-icon>add</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>edit_outline</mat-icon>
          <span>Rename section</span>
        </button>
        <button mat-menu-item (click)="sectionDelete.emit(section)">
          <mat-icon>delete_outline</mat-icon>
          <span>Delete section</span>
        </button>
      </mat-menu>
    </div>
  `,
  styleUrls: ['./section.component.scss'],
  host: { 'class': 'section-header' },
  encapsulation: ViewEncapsulation.None
})
export class SectionHeaderComponent extends SectionComponent {}
