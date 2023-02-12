import { type MenuItem } from 'primereact/menuitem';

const items: MenuItem[] = [
  {
    label: 'Todo',
    items: [
      {
        label: 'List of todos',
        icon: 'pi pi-check',
        url: '/todo',
      },
    ],
  },
];

export default items;
