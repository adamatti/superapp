import { type MenuItem } from 'primereact/menuitem';

const items: MenuItem[] = [
  {
    label: 'Url Shortener',
    items: [
      {
        label: 'List of urls',
        icon: 'pi pi-map',
        url: '/urls',
      },
    ],
  },
];

export default items;
