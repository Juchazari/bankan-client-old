import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  HostListener
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { take } from 'rxjs';

import { Task } from '../../models';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: { 'class': 'task' },
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent {

  @Input() task: Task;

  @Output() taskDelete: EventEmitter<Task> = new EventEmitter<Task>();

  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;

  isTaskMousedOver = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isTaskMousedOver = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.matMenuTrigger.menuOpen) {
      this.matMenuTrigger.menuClosed
        .pipe(take(1))
        .subscribe({
          next: () => this.isTaskMousedOver = false
        });
    } else {
      this.isTaskMousedOver = false;
    }
  }
}
