import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Board } from '../models';
import { BoardService } from '@core/services';

@Injectable()
export class BoardResolver implements Resolve<Board> {
  constructor(private boardService: BoardService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Board> {
    return this.boardService.getBoard(+route.paramMap.get('id'));
  }
}
