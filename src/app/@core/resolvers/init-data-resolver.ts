import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BoardGroupService, BoardService } from '@core/services';

@Injectable()
export class InitDataResolver implements Resolve<boolean[]> {
  constructor(
    private boardService: BoardService,
    private boardGroupService: BoardGroupService
  ) {
  }

  resolve(): Promise<boolean[]> {
    return Promise.all([
      this.boardService.initialize(),
      this.boardGroupService.initialize()
    ]);
  }
}
