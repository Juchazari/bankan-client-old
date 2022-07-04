import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, map, take } from 'rxjs';

import { BoardGroupService, BoardService } from '@core/services';
import { Board } from '../../models';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  host: { 'class': 'top-bar' },
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent {

  @Input() board: Board;

  constructor(
    private router: Router,
    private boardGroupService: BoardGroupService,
    private boardService: BoardService
  ) {}

  deleteBoard(boardGroupId: number, boardId: number): void {
    this.boardService.deleteBoard(boardId)
      .pipe(
        switchMap((deleteBoardRes) => (
          this.boardGroupService.removeBoard(boardGroupId, boardId)
            .pipe(map(() => deleteBoardRes))
        )),
        take(1)
      )
      .subscribe({
        next: ({ deleted, boards}) => {
          if (deleted) {
            this.router.navigate([`/boards/${boards[0].id}`]);
          }
        }
      });
  }
}
