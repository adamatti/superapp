import { Button } from 'primereact/button';
import { useAuth } from '~/auth';

interface HeaderOptions {
  sidebarAction: (func: (old: boolean) => boolean) => void;
}

function Header(options: HeaderOptions): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout-topbar">
      {isAuthenticated && (
        <Button
          className="p-link layout-menu-button layout-topbar-button"
          onClick={() => {
            options.sidebarAction((old: boolean) => !old);
          }}
        >
          <i className="pi pi-bars" />
        </Button>
      )}
      <div className="layout-topbar-title">
        <a href="/" className="layout-topbar-title-link">
          Superapp
        </a>
      </div>
      <br />
      {isAuthenticated && (
        <div className="layout-topbar-menu">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
