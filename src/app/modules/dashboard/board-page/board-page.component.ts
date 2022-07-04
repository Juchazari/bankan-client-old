import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { BoardService } from '@core/services';
import { Board } from '../models';

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  host: { 'id': 'board-page' },
  encapsulation: ViewEncapsulation.None
})
export class BoardPageComponent {

  board$: Observable<Board> = this.boardService.getActiveBoard();
  addingSection = false;
  newSectionName: string;

  constructor(private boardService: BoardService) {}

}
