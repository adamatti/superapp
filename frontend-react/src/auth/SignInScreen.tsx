import useAuth from './useAuth';
import LoginPage from './LoginPage';

function WelcomePage() {
  const { logout, user } = useAuth();

  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {user?.displayName}! You are now signed-in!</p>
      <a onClick={logout}>Sign-out</a>
    </div>
  );
}

function SignInScreen() {
  const { isAuthenticated } = useAuth(); // Local signed-in state.

  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return <WelcomePage />;
}
export default SignInScreen;
