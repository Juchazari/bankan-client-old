import { Icon } from '@core/models';
import { Section } from '.';

export interface Board {
  id: number;
  name: string;
  boardGroupId: number;
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
