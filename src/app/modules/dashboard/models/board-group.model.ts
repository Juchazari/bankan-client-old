import { Board } from '.';

export interface BoardGroup {
  id: number;
  name: string;
  boards: Board[];
}

export interface CreateBoardGroup {
  name: string;
}

export interface DeleteBoardGroupResponse {
  deleted: boolean;
  boardGroups: BoardGroup[];
}
