import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <>
      <div className="layout-footer">
        <span className="font-medium ml-2">Superapp</span>
        <Link to="https://github.com/adamatti/superapp">
          <i className="pi pi-fw pi-github" />
        </Link>
      </div>
    </>
  );
}

export default Footer;
