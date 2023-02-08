import { BOARD_GROUPS_MAP } from '.';
import { BoardGroup } from '../../modules/dashboard/models';

export const BOARD_GROUPS: BoardGroup[] = [
  {
    id: 123,
    name: 'Web Design',
    boards: BOARD_GROUPS_MAP[123]
  },
  {
    id: 124,
    name: 'Architecture',
    boards: BOARD_GROUPS_MAP[124]
  }
];
