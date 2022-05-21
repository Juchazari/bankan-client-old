import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Subject, map, take, takeUntil, withLatestFrom, switchMap } from 'rxjs';

import { BoardGroupService, BoardService } from '@core/services';
import { Board, Section } from '../models';

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  host: { 'id': 'board-page' },
  encapsulation: ViewEncapsulation.None
})
export class BoardPageComponent implements OnInit, OnDestroy {

  @ViewChild('sectionsContainer') sc: ElementRef;

  loading: boolean = true;
  notFound = false;
  board: Board;
  sections: Section[];
  addingSection = false;
  newSectionName: string;

  private readonly destroyed: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private boardGroupService: BoardGroupService
  ) {}

  ngOnInit() {
    this.setInitialLoadDataSub();
    this.setNavigationEventsSub();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  ensureBodyScrollEnd() {
    this.sc.nativeElement.scrollLeft = this.sc.nativeElement.scrollWidth;
  }

  setAddingSection(value: boolean) {
    this.addingSection = value;
  }

  deleteSection(section: Section) {
    this.sections = this.sections.filter(s => s !== section);
  }

  onBlurOrEnter(enter?: boolean) {
    const addSection = () => {
      const newSection: Section = { id: 892102, name: this.newSectionName, tasks: [] };
      this.sections.push(newSection);
      this.newSectionName = undefined;
    };

    if (!enter) {
      if (this.newSectionName) {
        addSection();
      }
      this.setAddingSection(false);
    } else if (this.newSectionName) {
      addSection();
    }
  }

  deleteBoard(board: Board): void {
    this.boardService.deleteBoard(board.id)
      .pipe(
        switchMap((deleteBoardRes) => (
          this.boardGroupService.removeBoard(board)
            .pipe(map(() => deleteBoardRes))
        )),
        take(1)
      )
      .subscribe({
        next: ({ deleted, boards}) => {
          if (deleted) {
            this.router.navigate([`/boards/${boards[0].id}`]);
          }
        }
      });
  }

  private setBoard(board: Board): void {
    if (board) {
      this.board = board;
      this.sections = board.sections;
    }
    this.notFound = !board;
  }

  private setInitialLoadDataSub(): void {
    this.route.data
      .pipe(map(it => it['board']), take(1))
      .subscribe({
        next: (board) => {
          this.setBoard(board);
          this.loading = false;
        }
      });
  }

  private setNavigationEventsSub(): void {
    this.router.events
      .pipe(withLatestFrom(this.route.data), takeUntil(this.destroyed))
      .subscribe({
        next: ([event, data]) => {
          if (event instanceof NavigationStart) {
            this.loading = true
          }

          if (event instanceof NavigationEnd) {
            this.setBoard(data['board']);
            this.loading = false
          }

          if (event instanceof NavigationCancel || event instanceof NavigationError) {
            this.loading = false
          }
        }
      });
  }
}
