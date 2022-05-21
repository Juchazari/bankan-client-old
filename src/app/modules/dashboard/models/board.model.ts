import { Icon } from '@core/models';
import { Section } from '.';

export interface BoardBase {
  id: number;
  name: string;
  boardGroupId: number;
}

export interface Board extends BoardBase {
  description?: string;
  icon?: Icon;
  sections: Section[];
}

export interface CreateBoard {
  name: string;
  boardGroupId: number;
  description?: string;
}

export interface DeleteBoardResponse {
  deleted: boolean;
  boards: Board[];
}
