import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

import { AuthService } from '@core/services';
import { NewBoardDialogComponent } from '..';
import { BoardGroup } from '../../models';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: { 'class': 'sidebar' },
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  @Input() boardGroups: BoardGroup[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  openNewBoardDialog(boardGroupId: number): void {
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
}
