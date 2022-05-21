import { BOARD_GROUPS_MAP } from '.';
import { Board } from '../../modules/dashboard/models';

export const BOARDS: Board[] = [
  ...BOARD_GROUPS_MAP[123],
  ...BOARD_GROUPS_MAP[124]
];

/** ---- ICONS ---- */
// icon: {
//   id: 1,
//   url: '../../../../assets/images/board-1-logo.svg',
//   key: ''
// }
// icon: {
//   id: 2,
//   url: '../../../../assets/images/board-2-logo.svg',
//   key: ''
// }
// icon: {
//   id: 3,
//   url: '../../../../assets/images/board-3-logo.svg',
//   key: ''
// }