import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

import { Board } from '../../models';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  host: { 'class': 'top-bar' },
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent {
  @Input() loading: boolean;
  @Input() board: Board;
  @Output() boardDelete = new EventEmitter<Board>();
}
