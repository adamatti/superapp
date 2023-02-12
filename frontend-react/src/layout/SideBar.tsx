import { Sidebar as SideBarFromPR } from 'primereact/sidebar';
import Menu from './Menu';

interface SideBarOptions {
  visible: boolean;
  action: (func: (old: boolean) => boolean) => void;
}

function SideBar(option: SideBarOptions): JSX.Element {
  return (
    <SideBarFromPR
      visible={option.visible}
      position="left"
      onHide={() => {
        option.action(() => false);
      }}
    >
      <Menu />
    </SideBarFromPR>
  );
}

export default SideBar;
