import { BOARD_GROUPS_MAP } from '.';
import { Board } from '../../modules/dashboard/models';

export const BOARDS: Board[] = [
  ...BOARD_GROUPS_MAP[123],
  ...BOARD_GROUPS_MAP[124]
];
