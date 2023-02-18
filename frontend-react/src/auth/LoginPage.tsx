import { StyledFirebaseAuth as FirebaseAuth } from 'react-firebaseui';
// import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
const { auth } = firebase;

function LoginPage(): JSX.Element {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
      auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    </div>
  );
}

export default LoginPage;
