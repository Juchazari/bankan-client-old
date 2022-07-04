import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { BoardGroupService } from '@core/services';
import { BoardGroup } from './models';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { 'id': 'dashboard' },
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  boardGroups$: Observable<BoardGroup[]> = this.boardGroupService.getBoardGroups();
  constructor(private boardGroupService: BoardGroupService) {}
}

// if (!this.route.firstChild) {
//   this.router.navigate([`/boards/${this.boardGroups[0].boards[0].id}`]);
// }
