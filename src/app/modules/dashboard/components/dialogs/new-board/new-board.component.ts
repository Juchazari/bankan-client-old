import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, switchMap, take } from 'rxjs';

import { BoardGroupService, BoardService } from '@core/services';

@Component({
  templateUrl: './new-board.component.html'
})
export class NewBoardDialogComponent {

  name: string;
  description: string;
  submitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { boardGroupId: number; },
    private dialogRef: MatDialogRef<NewBoardDialogComponent>,
    private router: Router,
    private boardService: BoardService,
    private boardGroupService: BoardGroupService
  ) {}

  hasName(): boolean {
    return this.name?.length > 0;
  }

  submit(): void {
    this.submitting = true;

    const createBoard = {
      boardGroupId: this.data.boardGroupId,
      name: this.name,
      description: this.description
    };

    this.boardService.createBoard(createBoard)
      .pipe(
        switchMap(board => (
          this.boardGroupService.addBoard(board)
            .pipe(map(() => board))
        )),
        take(1)
      )
      .subscribe({
        next: (board) => {
          this.router.navigate([`/boards/${board.id}`]);
          this.dialogRef.close();
        }
      });
  }
}
