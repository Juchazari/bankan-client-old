import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take, withLatestFrom, BehaviorSubject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BOARD_GROUPS } from '../mocks';
import { Board, BoardGroup, CreateBoardGroup, DeleteBoardGroupResponse } from '../../modules/dashboard/models';

@Injectable()
export class BoardGroupService {

  private mock = false;
  private subject = new BehaviorSubject<BoardGroup[]>([]);
  private boardGroups$: Observable<BoardGroup[]> = this.subject.asObservable();

  private readonly apiURL = `${environment.baseURL}/board-groups`;
  private readonly options = { withCredentials: true };

  constructor(private http: HttpClient) {
  }

  initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.mock) {
        this.subject.next(BOARD_GROUPS);
        resolve(true);
      } else {
        this.http.get<BoardGroup[]>(this.apiURL, this.options)
          .pipe(take(1))
          .subscribe({
            next: (boardGroups) => {
              this.subject.next(boardGroups);
              resolve(true);
            },
            error: (error) => resolve(error)
          });
      }
    });
  }

  getBoardGroups(): Observable<BoardGroup[]> {
    return this.boardGroups$;
  }

  getBoardGroup(id: number): Observable<BoardGroup> {
    return this.getBoardGroups()
      .pipe(
        take(1),
        map(boardGroups => boardGroups.find(boardGroup => boardGroup.id === id))
      );
  }

  createBoardGroup(body: CreateBoardGroup): Observable<BoardGroup> {
    if (this.mock) {
      return this.createBoardGroupMock(body);
    }

    return this.http.post<BoardGroup>(this.apiURL, body, this.options)
      .pipe(
        withLatestFrom(this.getBoardGroups()),
        map(([boardGroup, boardGroups]) => {
          const updatedBoardGroups = [...boardGroups, boardGroup];
          this.subject.next(updatedBoardGroups);
          return boardGroup;
        })
      );
  }

  deleteBoardGroup(id: number): Observable<DeleteBoardGroupResponse> {
    if (this.mock) {
      return this.deleteBoardGroupMock(id);
    }

    return this.http.delete(`${this.apiURL}/${id}`, this.options)
      .pipe(
        switchMap(() => this.getBoardGroups()),
        take(1),
        map((boardGroups) => {
          const updatedBoardGroups = boardGroups.filter(boardGroup => boardGroup.id !== id);
          this.subject.next(updatedBoardGroups);
          return { deleted: true, boardGroups };
        })
      );
  }

  addBoard(board: Board): Observable<void> {
    return this.getBoardGroups()
      .pipe(
        take(1),
        map(boardGroups => {
          const updatedBoardGroups = boardGroups.map(boardGroup => {
            const boardGroupClone = structuredClone(boardGroup);

            if (boardGroupClone.id === board.boardGroupId) {
              boardGroupClone.boards.push(board);
            }

            return boardGroupClone;
          });
          this.subject.next(updatedBoardGroups);
        })
      );
  }

  removeBoard(board: Board): Observable<void> {
    return this.getBoardGroups()
      .pipe(
        take(1),
        map(boardGroups => {
          const updatedBoardGroups = boardGroups.map(boardGroup => {
            // shallow copy is fine since we are filtering boards
            const boardGroupClone = { ...boardGroup };

            if (boardGroupClone.id === board.boardGroupId) {
              boardGroupClone.boards = boardGroupClone.boards.filter(b => b.id !== board.id);
            }

            return boardGroupClone;
          });
          this.subject.next(updatedBoardGroups);
        })
      );
  }

  // ---- METHODS FOR MOCK DATA ---- //

  createBoardGroupMock(body: CreateBoardGroup): Observable<BoardGroup> {
    return this.getBoardGroups()
      .pipe(
        take(1),
        map(boardGroups => {
          const mockBoardGroup: BoardGroup = { id: 781, name: body.name, boards: [] };
          const updatedBoardGroups = [...boardGroups, mockBoardGroup];
          this.subject.next(updatedBoardGroups);
          return mockBoardGroup;
        })
      );
  }

  deleteBoardGroupMock(id: number): Observable<DeleteBoardGroupResponse> {
    return this.getBoardGroups()
      .pipe(
        map(boardGroups => {
          const updatedBoardGroups = boardGroups.filter(boardGroup => boardGroup.id !== id);
          this.subject.next(updatedBoardGroups);
          return { deleted: true, boardGroups };
        })
      );
  }
}
