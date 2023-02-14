import useAuth from './useAuth';

interface IsAuthenticatedOptions {
  children: React.ReactElement;
}

function IsAuthenticated(options: IsAuthenticatedOptions): JSX.Element {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && options.children}
      {!isAuthenticated && <div>Not authenticated</div>}
    </>
  );
}

export default IsAuthenticated;
