import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';

function LoginPage(): JSX.Element {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default LoginPage;
