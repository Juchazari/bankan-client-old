import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { BoardGroup } from '../models';
import { BoardGroupService } from '@core/services';

@Injectable()
export class BoardGroupsResolver implements Resolve<BoardGroup[]> {
  constructor(private boardGroupService: BoardGroupService) {
  }

  resolve(): Observable<BoardGroup[]> {
    return this.boardGroupService.getBoardGroups();
  }
}
