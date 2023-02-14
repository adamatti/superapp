import { Menu as MenuFromRP } from 'primereact/menu';
// import { PanelMenu as MenuFromRP } from 'primereact/panelmenu';
import { type MenuItem } from 'primereact/menuitem';
import { useAuth } from '~/auth';
import { MenuItems as TodoMenuItems } from '~/todo';
import { MenuItems as USMenuItems } from '~/url-shortener';

function Menu(): JSX.Element {
  const { logout } = useAuth();

  const items: MenuItem[] = [
    ...TodoMenuItems,
    { separator: true },
    ...USMenuItems,
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-user',
      command: logout,
    },
  ];

  return <MenuFromRP model={items} />;
}

export default Menu;
