import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Board } from '../models';
import { BoardService } from '@core/services';

@Injectable()
export class BoardResolver implements Resolve<void> {
  constructor(private boardService: BoardService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<void> {
    return this.boardService.setActiveBoard(+route.paramMap.get('id'));
  }
}
