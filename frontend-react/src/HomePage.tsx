import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './auth/LoginButton';
import { ProgressSpinner } from 'primereact/progressspinner';

// TODO break it in small components
function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading && <ProgressSpinner />}
      {!isLoading && isAuthenticated && (
        <div>
          Hello world. Current projects:
          <ul>
            <li>
              <Link to="/todo">Todo app</Link>
            </li>
            <li>
              <Link to="/urls">Url Shortener</Link>
            </li>
          </ul>
        </div>
      )}
      {!isLoading && !isAuthenticated && (
        <div>
          Not authenticated
          <br />
          <LoginButton />
        </div>
      )}
    </>
  );
}

export default HomePage;
