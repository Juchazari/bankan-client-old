import { Board } from '../../modules/dashboard/models';

interface BoardGroupMap {
  [groupId: number]: Board[];
}

export const BOARD_GROUPS_MAP: BoardGroupMap = {
  123: [
    {
      id: 234,
      name: 'Modern Application',
      boardGroupId: 123,
      sections: [
        {
          id: 14891,
          name: 'To Do',
          tasks: [
            {
              id: 12345,
              name: 'Portal work for Export Teams Posts, requiring a much longer name to see how it fits',
              due_date: 'Feb 23, 2023',
              description: 'Awesome description',
              comments: [
                {
                  id: 1,
                  body: 'Comment 1'
                },
                {
                  id: 2,
                  body: 'Comment 2'
                }
              ],
              attachments: [
                {
                  id: 23
                }
              ],
              labels: [
                {
                  id: 1,
                  value: 'vbo_dev',
                  color: '#c377e0'
                },
                {
                  id: 2,
                  value: 'backlog',
                  color: '#d9b51c'
                }
              ]
            },
            {
              id: 12346,
              name: 'Portal work for Download Team Files',
              due_date: 'Mar 23',
              comments: [
                {
                  id: 1,
                  body: 'Comment 1'
                }
              ],
              labels: [
                {
                  id: 3,
                  value: 'vbo_dev',
                  color: '#c377e0'
                }
              ]
            }
          ]
        },
        {
          id: 14892,
          name: 'In Progress',
          tasks: [
            {
              id: 10127,
              name: 'Create awesome potato modal',
              description: 'Cool beans description'
            }
          ]
        },
        {
          id: 14893,
          name: 'Code Review',
          tasks: []
        }
      ]
    },
    {
      id: 235,
      name: 'VBO Teams',
      boardGroupId: 123,
      sections: [
        {
          id: 19827,
          name: 'To Do',
          tasks: [
            {
              id: 13489,
              name: 'Modern App restore implementation for all services: Teams, SharePoint, OneDrive, Exchange'
            },
            {
              id: 13490,
              name: 'Bug fix modal wont display correct id'
            },
            {
              id: 13491,
              name: 'Create new modal for download team files via email'
            },
            {
              id: 13492,
              name: 'Add Teams folder / Teams icon'
            },
            {
              id: 13493,
              name: 'Manage new app design for modal component at the org level'
            },
            {
              id: 13494,
              name: 'Establish the button component throughout the console'
            },
            {
              id: 13495,
              name: 'IP-2231: Console restore app not refreshing properly'
            },
            {
              id: 13496,
              name: 'IP-5271: [VBO] widget lags on loading of too many users'
            },
            {
              id: 13497,
              name: 'Need new widget resizing styles for better user of summary item'
            },
            {
              id: 13498,
              name: 'CSV Extract needs to be updated to apply licensing changes'
            },
            {
              id: 13499,
              name: 'Portal work for send teams Posts via email'
            }
          ]
        },
        {
          id: 19828,
          name: 'In Progress',
          tasks: []
        },
        {
          id: 19829,
          name: 'Code Review',
          tasks: []
        },
        {
          id: 19830,
          name: 'On Hold / Blocked',
          tasks: []
        },
        {
          id: 19992,
          name: 'Done',
          tasks: []
        }
      ]
    },
    {
      id: 236,
      name: 'SSO Security 2.0',
      boardGroupId: 123,
      sections: [
        {
          id: 21901,
          name: 'To Do',
          tasks: [
            {
              id: 98721,
              name: 'Portal work for send Teams files via email'
            },
            {
              id: 98722,
              name: 'Portal work awesomeness'
            },
            {
              id: 98723,
              name: 'Create a cool beans'
            }
          ]
        },
        {
          id: 21902,
          name: 'In Progress',
          tasks: []
        }
      ]
    }
  ],
  124: [
    {
      id: 567,
      name: 'Coca Cola',
      boardGroupId: 124,
      sections: []
    },
    {
      id: 568,
      name: 'Project Almanac',
      boardGroupId: 124,
      sections: []
    },
    {
      id: 569,
      name: 'Uncharted Sequel',
      boardGroupId: 124,
      sections: []
    }
  ]
};
