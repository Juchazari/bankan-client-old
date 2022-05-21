import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';

import { AuthService, BoardGroupService } from '@core/services';
import { NewBoardDialogComponent } from './components';
import { BoardGroup } from './models';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { 'id': 'dashboard' },
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  boardGroups: BoardGroup[];

  private readonly destroyed: Subject<boolean> = new Subject();
  
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
              private boardGroupService: BoardGroupService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getAndSetBoardGroups();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  openNewBoardDialog(boardGroupId: number) {
    this.dialog.open(
      NewBoardDialogComponent,
      {
        width: '450px',
        data: { boardGroupId }
      }
    );
  }

  logout(): void {
    this.authService.logout()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  private getAndSetBoardGroups(): void {
    this.boardGroupService.getBoardGroups()
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (boardGroups) => {
          this.boardGroups = boardGroups;
          this.loading = false;

          if (!this.route.firstChild) {
            this.router.navigate([
              `/boards/${this.boardGroups[0].boards[0].id}`
            ]);
          }
        }
      });
  }
}
