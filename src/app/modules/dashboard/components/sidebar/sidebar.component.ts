import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { BoardGroup } from '../../models';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: { 'class': 'sidebar' },
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  @Input() loading: boolean;
  @Input() boardGroups: BoardGroup[];
  @Output() newBoard = new EventEmitter<number>();
  @Output() logout = new EventEmitter();
}
