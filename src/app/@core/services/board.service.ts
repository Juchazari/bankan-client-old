import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take, withLatestFrom, BehaviorSubject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BOARDS } from '../mocks';
import { Board, CreateBoard, DeleteBoardResponse } from '../../modules/dashboard/models';

@Injectable()
export class BoardService {

  private mock = false;
  private subject = new BehaviorSubject<Board[]>([]);
  private boards$: Observable<Board[]> = this.subject.asObservable();

  private readonly apiURL = `${environment.baseURL}/boards`;
  private readonly options = { withCredentials: true };

  constructor(private http: HttpClient) {
  }

  initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.mock) {
        this.subject.next(BOARDS);
        resolve(true);
      } else {
        this.http.get<Board[]>(this.apiURL, this.options)
          .pipe(take(1))
          .subscribe({
            next: (boards) => {
              this.subject.next(boards);
              resolve(true);
            },
            error: (error) => resolve(error)
          });
      }
    });
  }

  getBoards(): Observable<Board[]> {
    return this.boards$;
  }

  getBoard(id: number): Observable<Board> {
    return this.getBoards()
      .pipe(
        take(1),
        map(boards => boards.find(board => board.id === id))
      );
  }

  createBoard(body: CreateBoard): Observable<Board> {
    if (this.mock) {
      return this.createBoardMock(body);
    }

    return this.http.post<Board>(this.apiURL, body, this.options)
      .pipe(
        withLatestFrom(this.getBoards()),
        map(([board, boards]) => {
          const updatedBoards = [...boards, board];
          this.subject.next(updatedBoards);
          return board;
        })
      );
  }

  deleteBoard(id: number): Observable<DeleteBoardResponse> {
    if (this.mock) {
      return this.deleteBoardMock(id);
    }

    return this.http.delete(`${this.apiURL}/${id}`, this.options)
      .pipe(
        switchMap(() => this.getBoards()),
        take(1),
        map((boards) => {
          const updatedBoards = boards.filter(board => board.id !== id);
          this.subject.next(updatedBoards);
          return { deleted: true, boards };
        })
      );
  }

  // ---- METHODS FOR MOCK DATA ---- //

  createBoardMock(body: CreateBoard): Observable<Board> {
    return this.getBoards()
      .pipe(
        take(1),
        map(boards => {
          const mockBoard: Board = { id: 681, boardGroupId: body.boardGroupId, name: body.name, icon: null, sections: [] };
          const updatedBoards = [...boards, mockBoard];
          this.subject.next(updatedBoards);
          return mockBoard;
        })
      );
  }

  deleteBoardMock(id: number): Observable<DeleteBoardResponse> {
    return this.getBoards()
      .pipe(
        take(1),
        map(boards => {
          const updatedBoards = boards.filter(board => board.id !== id);
          this.subject.next(updatedBoards);
          return { deleted: true, boards: updatedBoards };
        })
      );
  }
}
