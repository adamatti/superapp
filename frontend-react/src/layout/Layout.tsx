import { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

interface LayoutOptions {
  children: React.ReactNode;
}

function Layout(options: LayoutOptions): JSX.Element {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <Header sidebarAction={setSidebarVisible} />
      <SideBar visible={sidebarVisible} action={setSidebarVisible} />
      <div className="layout-main-container">
        <div className="layout-main">{options.children}</div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
